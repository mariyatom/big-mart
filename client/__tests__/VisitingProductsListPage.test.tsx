// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import nock from 'nock'
import { renderRoute } from './setup.tsx'

// beforeAll(() => {
//   nock.disableNetConnect()
// })
afterEach(() => {
  nock.cleanAll()
  nock.restore()
})
const fakeCategories = {
  categories: [
    {
      id: 1,
      category: 'RICE & WHEAT',
      link: '/rice-wheat',
      image:
        'https://homeland.net.nz/cdn/shop/files/Rice_and_Wheat_1024x1024_crop_center.png?v=1696934430',
    },
    {
      id: 2,
      category: 'PICKLES & POWDERS',
      link: '/pickles-chutney-powders',
      image:
        'https://homeland.net.nz/cdn/shop/files/Pickles_and_Chutney_Powders_1024x1024_crop_center.png?v=1696934348',
    },
  ],
}

const fakeProducts = {
  products: [
    {
      id: 1,
      name: 'India Gate Basmati-Feast Rozanna',
      price: 15.99,
      currency: '$',
      image: 'https://homeland.net.nz/cdn/shop/files/69_360x.png?v=1707078567',
      description: 'India Gate Basmati-Feast Rozanna',
      categoryId: 1,
      location: 'Auckland, Auckland, New Zealand',
    },
    {
      id: 2,
      name: 'Pavizham Matta Rice 10 Kg',
      price: 24.99,
      currency: '$',
      image:
        'https://homeland.net.nz/cdn/shop/files/pavi_360x.jpg?v=1691930295',
      description: 'Pavizham Matta Rice 10 Kg',
      categoryId: 1,
      location: 'Auckland, Auckland, New Zealand',
    },
  ],
}

describe('Visiting the ProductsList page', () => {
  it('shows multiple loading indicator at products list page ', async () => {
    // Render the route for ProductsList
    const screen = renderRoute('/ProductsList')

    // Expect the loading indicator to be visible while waiting for data
    const indicators = screen.queryAllByTestId('loading-indicator') // Make sure LoadingIndicator has this test ID
    expect(indicators.length).toBeGreaterThan(0)
    expect(indicators[0]).toBeVisible()
  })

  it.todo('shows a list of all the products', async () => {
    nock('http://localhost')
      .get('/api/v1/categories')
      .reply(200, fakeCategories)
    const productsScope = nock('http://localhost')
      .get('/api/v1/products')
      .reply(200, fakeProducts)
    //ARRANGE
    const screen = renderRoute('/ProductsList')

    //ACT
    //ASSERT
    expect(productsScope.isDone()).toBe(true)
  })

  it('shows an error message when the server fails', async () => {
    // nock('http://localhost')
    //   .get('/api/v1/categories')
    //   .reply(
    //     500,
    //     'Oops! Something went wrong: Error: Unknown error from devtools'
    //   )
    nock('http://localhost')
      .get('/api/v1/products')
      .reply(
        500,
        'Oops! Something went wrong: Error: Unknown error from devtools'
      )

    const screen = renderRoute('/ProductsList')
    const errorMessage = await screen.findAllByText(
      (content) => content.includes('Oops! Something went wrong'),
      {},
      { timeout: 3000 } // Wait up to 3s for it to appear
    )

    expect(errorMessage.length).toBeGreaterThan(0)
    expect(errorMessage[0]).toBeVisible()
  })
})
