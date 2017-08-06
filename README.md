# React Analytics
Declarative analytics for React

```js
import { AnalyticsProvider, Identify } from 'react-analytics';
import { getSegmentProvider } from 'react-analytics-segment';

const segment = getSegmentProvider(config('segment_key'));

const App = ({ user }) =>
  <AnalyticsProvider provider={segment}>
    <Identify { ...user } />
  </AnalyticsProvider>
```

## Wrap components and track every property
```js
import { TrackClick } from 'react-analytics-dom';

const SuperSpecialTrackedButton = ({ name }) =>
  <TrackClick name={name} source="SuperSpecialTrackedButton" ohhai="👋">
    <SpecialButton />
  </TrackClick>
```

## Track page views with React Router
```js
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { TrackRouterHistory } from 'react-analytics-react-router';

const Router =>
  <BrowserRouter>
    <TrackRouterHistory />
  </BrowserRouter>
```
