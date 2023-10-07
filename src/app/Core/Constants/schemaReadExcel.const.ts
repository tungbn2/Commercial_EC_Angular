export const productSchema = {
  'Name': {
    prop: 'name',
    type: String,
    required: true
  },
  'Brand': {
    prop: 'brand',
    type: String,
    required: true
  },
  'Category': {
    prop: 'category',
    type: String,
    required: true
  },
  'Description': {
    prop: 'description',
    type: String,
    required: true
  },
  'Price': {
    prop: 'price',
    type: Number,
    required: true
  },
  'Rating': {
    prop: 'rating',
    type: Number,
    oneOf: [1,2,3,4,5],
    required: true
  },
  'Stock': {
    prop: 'countInStock',
    type: Number,
    required: true
  },
  'Image Urls': {
    prop: 'imageUrls',
    type: Array,
    required: true
  }
}

export const userSchema = {
  'User Name': {
    prop: 'username',
    type: String,
    required: true
  },
  'Email': {
    prop: 'email',
    type: String,
    required: true
  },
  'Password': {
    prop: 'password',
    type: String,
    required: true
  },
  'Role': {
    prop: 'role',
    type: String,
    oneOf: ['admin','user'],
    required: true
  }
}
