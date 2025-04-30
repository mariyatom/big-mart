import { Link } from 'react-router-dom'

interface BreadcrumbsProps {
  productName: string
}

const Breadcrumbs = ({ productName }: BreadcrumbsProps) => {
  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumb-link">
        HOME
      </Link>
      /
      <Link to="/ProductsList" className="breadcrumb-link">
        PRODUCTS
      </Link>
      / {productName.toUpperCase()}
    </div>
  )
}

export default Breadcrumbs
