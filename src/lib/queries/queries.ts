import { defineQuery } from "next-sanity";

// This file is used by Sanity typegen to generate query result types
export const allProductsQuery = defineQuery(`*[_type == "product"]{
  _id,
  productName ,
  description,
  price,
  icon,
   relatedProducts[]{  // <-- add the spread operator for array of images
    _key,
    asset->{_id, url} // grab the asset reference so you can use it in urlFor
  },
  slug,
  stock,
  category, 
}`);

export const categoriesQuery = defineQuery(`*[_type == "category"]{
  _id,
  title,
  slug,
  description
}`);

export const productBySlugQuery =
  defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  _id,
  productName,
  description,
  price,relatedProducts[]{  // <-- add the spread operator for array of images
    _key,
    asset->{_id, url} // grab the asset reference so you can use it in urlFor
  },
  icon,
  slug,
  stock,
  category
}`);

export const productSearchQuery = defineQuery(`
  *[_type == "product" && productName match $searchTerm + "*"] | order(productName asc) {
    _id,
    productName,
    description,
    price,
    icon,
    slug,
    stock,relatedProducts[]{  // <-- add the spread operator for array of images
    _key,
    asset->{_id, url} // grab the asset reference so you can use it in urlFor
  },
    category
  }
`);

// lib/queries.ts
export const productsByCategorySlugQuery = defineQuery(`
  *[_type == "product" && $slug in category[]->slug.current] | order(productName asc) {
    _id,
    productName,
    description,
    price,
    icon,
    slug,
    stock,relatedProducts[]{  // <-- add the spread operator for array of images
    _key,
    asset->{_id, url} // grab the asset reference so you can use it in urlFor
  },
    category[]->{
      _id,
      title,
      slug
    }
  }
`);

// Get user orders by email
export const userOrdersQuery = defineQuery(`
  *[_type == "order" && customerEmail == $email] | order(orderDate desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    orderNumber,
    stripeCheckoutSessionId,
    stripeCustomerId,
    customerEmail,
    stripePaymentId,
    currency,
    amountDiscount,
    totalPrice,
    status,
    orderDate
  }
`);
