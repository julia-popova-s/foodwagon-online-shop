import { useSelector } from 'react-redux'

export function SearchPage() {
  const { isLoaded, products } = useSelector((state) => state.products)

  return (
    <>
      {isLoaded &&
        products?.map((item, index) => {
          console.log(item)
          return (
            <div key={index}>
              {item.title}
              <img alt="" src={'/foodwagon' + item.image} />
            </div>
          )
        })}
      {!isLoaded && !products.length && <div>niop</div>}
    </>
  )
}
