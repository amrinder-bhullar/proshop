import { Tabs, Tab, TabContent } from "react-bootstrap";
import ProductReviews from "./ProductReviews";

const ProductTabs = ({ product, userInfo, productId, refetch }) => {
  return (
    <Tabs
      defaultActiveKey="description"
      id="uncontrolled-tab-example"
      className="mb-3"
      variant="pills"
    >
      <Tab eventKey="description" title="Description">
        <TabContent dangerouslySetInnerHTML={{ __html: product.description }} />
      </Tab>
      <Tab eventKey="reviews" title="Reviews">
        <ProductReviews
          product={product}
          userInfo={userInfo}
          productId={productId}
          refetch={refetch}
        />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        Tab content for Contact
      </Tab>
    </Tabs>
  );
};

export default ProductTabs;
