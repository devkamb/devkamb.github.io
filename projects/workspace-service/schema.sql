CREATE TABLE workspace_operations (
  operation_id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL,
  client_id TEXT NOT NULL,
  operation_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  sequence_number BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX workspace_client_operation ON workspace_operations(workspace_id, client_id, operation_id);
