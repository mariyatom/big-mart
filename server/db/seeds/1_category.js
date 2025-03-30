export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('category').del()

  // Inserts seed entries
  await knex('category').insert([
    {
      id: 1,
      category: 'RICE & WHEAT',
      link: '/rice-wheat',
      image:
        'https://homeland.net.nz/cdn/shop/files/Rice_and_Wheat_1024x1024_crop_center.png?v=1696934430',
    },
    {
      id: 2,
      category: 'PICKLES & CHUTNEY POWDERS',
      link: '/pickles-chutney-powders',
      image:
        'https://homeland.net.nz/cdn/shop/files/Pickles_and_Chutney_Powders_1024x1024_crop_center.png?v=1696934348',
    },
    {
      id: 3,
      category: 'SPICES & MASALAS',
      link: '/spices-masalas',
      image:
        'https://homeland.net.nz/cdn/shop/files/Spices_and_Masalas_1024x1024_crop_center.png?v=1696934194',
    },
    {
      id: 4,
      category: 'READY TO COOK & EAT',
      link: '/ready-to-cook-eat',
      image:
        'https://homeland.net.nz/cdn/shop/files/Ready_to_Cook_and_Ready_to_Eat_1024x1024_crop_center.png?v=1696934396',
    },
    {
      id: 5,
      category: 'OIL, GHEE & VINEGAR',
      link: '/oil-ghee-vinegar',
      image:
        'https://homeland.net.nz/cdn/shop/files/Oil_Ghee_and_Vinegar_1024x1024_crop_center.png?v=1696934318',
    },
    {
      id: 6,
      category: 'SNACKS & BAKERY',
      link: '/snacks-bakery',
      image:
        'https://homeland.net.nz/cdn/shop/files/snacks_and_bakery_image.png',
    },
    {
      id: 7,
      category: 'DALS, LENTILS & PULSES',
      link: '/dals-lentils-pulses',
      image:
        'https://homeland.net.nz/cdn/shop/files/Dals_Lentils_and_Pulses_1024x1024_crop_center.png?v=1696934269',
    },
    {
      id: 8,
      category: 'SALT, SUGAR & JAGGERY',
      link: '/salt-sugar-jaggery',
      image:
        'https://homeland.net.nz/cdn/shop/files/Salt_Sugar_and_Jaggery_1024x1024_crop_center.png?v=1696934467',
    },
    {
      id: 9,
      category: 'SWEETS & CHOCOLATES',
      link: '/sweets-chocolates',
      image:
        'https://homeland.net.nz/cdn/shop/files/Sweets_and_Chocolates_1024x1024_crop_center.png?v=1697004474',
    },
    {
      id: 10,
      category: 'MISCELLANEOUS',
      link: '/miscellaneous',
      image: 'https://homeland.net.nz/cdn/shop/files/miscellaneous_image.png',
    },
    {
      id: 11,
      category: 'FROZEN ITEMS',
      link: '/frozen-items',
      image:
        'https://homeland.net.nz/cdn/shop/files/Vegetables_b562ba15-be76-4e70-98a2-4c5bb7d85788_1024x1024_crop_center.png?v=1697004516',
    },
  ])
}
