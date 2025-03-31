// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderRoute } from './setup.tsx'

describe('Visiting the ProductsList page', () => {
  it('shows multiple loading indicator at products list page ', async () => {
    // Render the route for ProductsList
    const screen = renderRoute('/ProductsList')

    // Expect the loading indicator to be visible while waiting for data
    const indicators = screen.queryAllByTestId('loading-indicator') // Make sure LoadingIndicator has this test ID
    expect(indicators.length).toBeGreaterThan(0)
    expect(indicators[0]).toBeVisible()
  })
})
