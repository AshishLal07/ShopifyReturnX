import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const UPDATE_PRODUCT_MUTATION = `
    mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
            product{
                id
                descriptionHtml
                title
                variants(first:10){
                    edges{
                        node{
                            id
                            price
                        }
                    }
                }
            }
           
        }
    }

`;



export default async function productUpdate(session, {id,description,title,variants}){

    const client = new shopify.api.clients.Graphql({ session });
    console.log(id,title)

    try {
        await client.query({
            data:{
                query:UPDATE_PRODUCT_MUTATION,
                variables: {
                    input:{
                        id,
                        descriptionHtml:description,
                        title,
                        variants
                    }
                }
            }
        })
        
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