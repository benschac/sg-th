I boot-strapped the application with a starter using tools I use at work. Turbo-props is an open-source wrapper around styled-components we use in our day-to-day. Most of the setup was already done, so I could focus on coding.

- Code generation: A bit of overkill for something this small. Reading the introspection layer and getting a type-safe API response removes a whole crop of bugs and enforces consistency with their generated hooks.

- Turbo-props: Sensible defaults w/baked-in types from your theme.

- Zustand: For global level application state, zustand has grown on me quite a bit. It does a couple of things very well.

1. The API is very light; there's very little boilerplate.
2. It works outside of the React context.
3. They tackled the zombie child problem.
4. Doesn't use context.
5. Is reactive, mitigating unnecessary re-renders.

- Husky: Enforce type checking and linting before a commit.
- Moti: A library I use in production for animations.

Implementation:

- Updating state with a resolved ant score is a bit roundabout. In production, usually, a server's responses would be cached in Apollo and shown to the user. If this list were longer, I'd look for a different solution rather than updating the entire list in state O(n) times.
- Auth: Is completely mocked. No username or password is needed. Normally I would use something like Formik. With the time constraint, I didn't have time to set it up.
