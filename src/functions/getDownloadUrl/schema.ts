export default {
  type: "object",
  properties: {
    filename: { type: 'string' },
    expiry_in_seconds: { type: 'number' }
  },
  required: ['filename']
} as const;
