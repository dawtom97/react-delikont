import React, { useContext, useEffect, useState } from 'react'
import { Loader } from '../../src/components/Loader'
import { WishlistProducts } from '../../src/components/WishlistProducts/WishlistProducts'
import { UserContext } from '../../src/context/UserContext'
import { AccountTemplate } from '../../src/templates/AccountTemplate'


const Wishlist = () => {
  const {wishlist} = useContext(UserContext);
  console.log(wishlist);
  return (
    <AccountTemplate>
        {wishlist ? <WishlistProducts items={wishlist.items}/> : <Loader/>}
    </AccountTemplate>
  )
}

export default Wishlist