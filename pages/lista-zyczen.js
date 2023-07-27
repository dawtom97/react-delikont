import React, { useContext, useEffect, useState } from 'react'
import { Loader } from '../src/components/Loader'
import { WishlistProducts } from '../src/components/WishlistProducts/WishlistProducts'
import { UserContext } from '../src/context/UserContext'
import { MainTemplate } from '../src/templates/MainTemplate'


const Wishlist = () => {
  const {wishlist} = useContext(UserContext);
  return (
    <MainTemplate>
        {wishlist ? <WishlistProducts items={wishlist.items}/> : <Loader/>}
    </MainTemplate>
  )
}

export default Wishlist