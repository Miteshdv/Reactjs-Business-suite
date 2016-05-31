

export const UPDATE_SHOPPING_CART= 'UPDATE_SHOPPING_CART'
export function updateShoppingCart(productSelected,product)
{     

	 return {
		    type: UPDATE_SHOPPING_CART,
		    productSelected:productSelected,
		    product:product		    
		  }
}


export const UPDATE_PRODUCTS_VIEW= 'UPDATE_PRODUCTS_VIEW'
export function updateProductsView(productSelected,product)
{     

	 return {
		    type: UPDATE_PRODUCTS_VIEW,
		    productSelected:productSelected,
		    product:product
		  }
}



