# instructions

Minimal React + Vite "Hello World" site for the `instructions` project.

## Local Development

Install dependencies and start the dev server (hot reload):

```bash
npm install
npm run dev
```

Open the printed local URL (typically <http://localhost:5173>).

## Build (Production Assets)

```bash
npm run build
```

Outputs static files to `dist/`.

## Container (Multi-stage) Build

```bash
docker build -t instructions:latest .
docker run -p 8080:8080 instructions:latest
```

Visit <http://localhost:8080>.

## Deploy to Google Cloud Run

Prerequisites: gcloud CLI installed, authenticated, project + billing enabled.

```bash
PROJECT_ID="your-project-id"
REGION="us-central1"
SERVICE="instructions"
IMAGE="$REGION-docker.pkg.dev/$PROJECT_ID/web/$SERVICE:latest"

gcloud services enable run.googleapis.com artifactregistry.googleapis.com

gcloud artifacts repositories create web --repository-format=docker --location=$REGION || true

docker build -t $IMAGE .
gcloud auth configure-docker $REGION-docker.pkg.dev
docker push $IMAGE

gcloud run deploy $SERVICE \
  --image $IMAGE \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated
```

The deploy command prints the public URL.

## Why React here?

Using React now lets you grow into dynamic UI without redoing tooling. Vite keeps the setup lightweight (fast dev server, small config) while still supporting future routing, state management, code splitting, etc.

## Next Steps (Future Enhancements)

- Add React Router when you need multiple pages.
- Introduce a design system / component library.
- Add environment-based config (e.g. API base URLs).
- Add testing (Vitest + React Testing Library) before complexity increases.
- Implement CI pipeline to build & push image automatically.

---

Minimal now; ready to expand later.
