import shopify from "./shopify.js";
import { GraphqlQueryError } from "@shopify/shopify-api";


const FETCH_PRODUCT_QUERY = `
{
    products(first:10){
      edges{
        node{
          id
          title
          description
          legacyResourceId
          images(first:1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first:10){
            edges{
              node{
                id
                price
                title
              }
            }
          }
        }
        }
      }
    } 
`

const formatGQLResponse = (res) => {
    
    const edge = res?.body?.data?.products?.edges || []

    
    if(!edge.length) return []

    return edge.map(({node})=> ({
        id:node.id,
        legacyId:node.legacyResourceId,
        title:node.title,
        description:node.description,
        image: 
            node.images.edges[0]?.node?.url || "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
        ,
        variants:node.variants.edges.map(({node}) => ({
            id:node.id,
            title:node.title,
            price:node.price
        }))    
    }))
}


export default async function fetchProduct(session){
        const client = new shopify.api.clients.Graphql({session});

    try {
        const res = await  client.query({
            data:{
                query:FETCH_PRODUCT_QUERY
            }
        })

        return formatGQLResponse(res);
    } catch (error) {
        if (error instanceof GraphqlQueryError) {
            throw new Error(
              `${error.message}\n${JSON.stringify(error.response, null, 2)}`
            );
          } else {
            throw error;
          }
    }
}