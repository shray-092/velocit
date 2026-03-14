-- Users
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(100)  NOT NULL,
  email         VARCHAR(255)  UNIQUE NOT NULL,
  password_hash VARCHAR(255)  NOT NULL,
  plan          VARCHAR(20)   DEFAULT 'free',
  created_at    TIMESTAMPTZ   DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
  name         VARCHAR(255) NOT NULL,
  client_name  VARCHAR(255),
  industry     VARCHAR(100),
  project_type VARCHAR(100),
  status       VARCHAR(50)  DEFAULT 'draft',
  created_at   TIMESTAMPTZ  DEFAULT NOW(),
  updated_at   TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);

-- Project Inputs
CREATE TABLE project_inputs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE UNIQUE,
  form_data  JSONB       NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_project_inputs_project_id ON project_inputs(project_id);

-- Specifications
CREATE TABLE specifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  srs_content TEXT,
  brd_content TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_specifications_project_id ON specifications(project_id);
CREATE INDEX idx_specifications_user_id    ON specifications(user_id);

-- Code Artifacts
CREATE TABLE code_artifacts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID        REFERENCES projects(id) ON DELETE CASCADE,
  artifact_type VARCHAR(50) NOT NULL,
  content       TEXT        NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT code_artifacts_project_type UNIQUE (project_id, artifact_type)
);

CREATE INDEX idx_code_artifacts_project_id ON code_artifacts(project_id);
