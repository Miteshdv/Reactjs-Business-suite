

export const UPDATE_SHOPPING_CART= 'UPDATE_SHOPPING_CART'
export function updateShoppingCart(productSelected,product)
{     

	 return {
		    type: UPDATE_SHOPPING_CART,
		    productSelected:productSelected,
		    product:product
		  }
}