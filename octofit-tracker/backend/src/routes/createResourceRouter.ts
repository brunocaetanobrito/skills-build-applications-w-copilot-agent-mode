import { isValidObjectId, type Model } from 'mongoose';
import { Router, type Request, type Response } from 'express';

function editableFields<T extends object>(body: unknown): Partial<T> | null {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return null;
  }

  const fields = Object.fromEntries(
    Object.entries(body).filter(
      ([key]) =>
        !key.startsWith('$') &&
        !key.includes('.') &&
        !['_id', '__v', 'createdAt', 'updatedAt'].includes(key),
    ),
  );
  return Object.keys(fields).length > 0 ? (fields as Partial<T>) : null;
}

function getId(request: Request, response: Response): string | null {
  const id = request.params.id;
  if (typeof id !== 'string' || !isValidObjectId(id)) {
    response.status(400).json({ error: 'Invalid resource id' });
    return null;
  }
  return id;
}

export function createResourceRouter<T extends object>(
  resourceModel: Model<T>,
  listSort: Record<string, 1 | -1> = { createdAt: -1 },
) {
  const router = Router();

  router.get('/', async (_request, response) => {
    response.json(await resourceModel.find().sort(listSort));
  });

  router.get('/:id', async (request, response) => {
    const id = getId(request, response);
    if (!id) return;

    const resource = await resourceModel.findById(id);
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(resource);
  });

  router.post('/', async (request, response) => {
    const fields = editableFields<T>(request.body);
    if (!fields) {
      response.status(400).json({ error: 'Request body must contain resource fields' });
      return;
    }

    response.status(201).json(await resourceModel.create(fields));
  });

  router.patch('/:id', async (request, response) => {
    const id = getId(request, response);
    if (!id) return;

    const fields = editableFields<T>(request.body);
    if (!fields) {
      response.status(400).json({ error: 'Request body must contain resource fields' });
      return;
    }

    const resource = await resourceModel.findById(id);
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }

    resource.set(fields);
    response.json(await resource.save());
  });

  router.delete('/:id', async (request, response) => {
    const id = getId(request, response);
    if (!id) return;

    const resource = await resourceModel.findByIdAndDelete(id);
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.status(204).end();
  });

  return router;
}
