# Design Doc: <feature-id>

## Problem

What user or technical problem does this feature solve?

## User stories

- As a [role], I want [action] so that [benefit].

## Public API

```ts
// Proposed additions or changes to the public API.
```

## Internal architecture

How the feature integrates with the existing core (CandleBuffer, DataFeed, rendering layers, etc.).

## Data model

Types, schemas, and storage format for any new data this feature introduces.

## Serialization

How this feature participates in `saveLayoutState` / `loadState` round-trips. Schema migration strategy if applicable.

## Error handling

Expected failure modes and how they surface to the consumer (callbacks, thrown errors, silent fallbacks).

## Tests

- Unit test coverage plan
- Integration test scenarios
- Edge cases to cover

## Docs impact

What documentation pages need to be added or updated.

## Demo impact

How this feature appears on the openkline.tech site (examples, playground, roadmap status change).

## Bundle size impact

Estimated size delta. Lazy-loadable or always included?

## Open questions

Unresolved decisions that need input before implementation begins.
