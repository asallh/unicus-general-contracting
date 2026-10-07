# Unicus Admin Mobile

Expo admin portal for managing portfolio projects on the Unicus marketing site.

## Flows

1. **Projects** — browse published work, pull to refresh, open detail, delete
2. **Add Project** — title, optional AI hint, photos
3. **Review & Publish** — AI description (editable), then publish via API

## Develop

```bash
pnpm --filter admin-mobile dev
```

Set `EXPO_PUBLIC_API_URL` in `.env.local` to your tRPC endpoint.
