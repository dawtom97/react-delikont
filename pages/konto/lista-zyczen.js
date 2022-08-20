import React, { useContext } from 'react'
import { Loader } from '../../src/components/Loader'
import { WishlistProducts } from '../../src/components/WishlistProducts/WishlistProducts'
import { UserContext } from '../../src/context/UserContext'
import { AccountTemplate } from '../../src/templates/AccountTemplate'


const Wishlist = () => {
  const {currentUser:{wishlist}} = useContext(UserContext);

  console.log(wishlist?.items)

  return (
    <AccountTemplate>
        {wishlist ? <WishlistProducts items={wishlist.items}/> : <Loader/>}
    </AccountTemplate>
  )
}

export default Wishlist