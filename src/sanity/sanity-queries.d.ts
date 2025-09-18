// types/sanity-queries.d.ts
import "@sanity/client";

declare module "@sanity/client" {
  interface SanityQueries {
    '*[_type == "product"]{_id, productName, description, price, icon, slug, stock, category}': AllProductsQueryResult;
    '*[_type == "category"]{_id, title, slug, description}': CategoriesQueryResult;
    '*[_type == "product" && slug.current == $slug][0]{_id, productName, description, price, icon, slug, stock, category}': ProductBySlugQueryResult;
    '*[_type == "product" && productName match $searchTerm + "*"] | order(productName asc) {_id, productName, description, price, icon, slug, stock, category}': ProductSearchQueryResult;
    '*[_type == "product" && $slug in category[]->slug.current] | order(productName asc) {_id, productName, description, price, icon, slug, stock, category[]->{_id, title, slug}}': ProductsByCategorySlugQueryResult;
    '*[_type == "order" && customerEmail == $email]': UserOrdersQueryResult;
  }
}
