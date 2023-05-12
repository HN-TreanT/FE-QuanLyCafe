// import React, { useRef, useState } from "react";
// import { Tabs } from "antd";
// import ContentOrderDetail from "./ContentOrderDetail/ContentOrderDetail";

// type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

// const initialItems = [
//   { label: "New tab", children: <ContentOrderDetail />, key: "1" },
// ];

// const OrderDetail: React.FC = () => {
//   const [activeKey, setActiveKey] = useState(initialItems[0].key);
//   const [items, setItems] = useState(initialItems);
//   const newTabIndex = useRef(0);

//   const onChange = (newActiveKey: string) => {
//     setActiveKey(newActiveKey);
//   };

//   const add = () => {
//     const newActiveKey = `newTab${newTabIndex.current++}`;
//     const newPanes = [...items];
//     newPanes.push({
//       label: "New Tab",
//       children: <ContentOrderDetail />,
//       key: newActiveKey,
//     });
//     setItems(newPanes);
//     setActiveKey(newActiveKey);
//   };

//   const remove = (targetKey: TargetKey) => {
//     let newActiveKey = activeKey;
//     let lastIndex = -1;
//     items.forEach((item, i) => {
//       if (item.key === targetKey) {
//         lastIndex = i - 1;
//       }
//     });
//     const newPanes = items.filter((item) => item.key !== targetKey);
//     if (newPanes.length && newActiveKey === targetKey) {
//       if (lastIndex >= 0) {
//         newActiveKey = newPanes[lastIndex].key;
//       } else {
//         newActiveKey = newPanes[0].key;
//       }
//     } else if (!newPanes.length) {
//       //Thêm dòng này
//       newPanes.push({
//         label: "New tab",
//         children: <ContentOrderDetail />,
//         key: `newTab${newTabIndex.current++}`,
//       });
//       newActiveKey = newPanes[0].key;
//     }
//     setItems(newPanes);
//     setActiveKey(newActiveKey);
//   };

//   const onEdit = (
//     targetKey: React.MouseEvent | React.KeyboardEvent | string,
//     action: "add" | "remove"
//   ) => {
//     if (action === "add") {
//       add();
//     } else {
//       remove(targetKey);
//     }
//   };

//   return (
//     <div className="order-detail">
//       <Tabs
//         type="editable-card"
//         onChange={onChange}
//         activeKey={activeKey}
//         onEdit={onEdit}
//         items={items}
//       />
//     </div>
//   );
// };

// export default OrderDetail;

import React, { useRef, useState } from "react";
import { Tabs } from "antd";
import ContentOrderDetail from "./ContentOrderDetail/ContentOrderDetail";

let initialItems = [
  { label: "ok tab", children: <ContentOrderDetail />, key: "1" },
];

const OrderDetail: React.FC = () => {
  const [items, setItems] = useState(initialItems);
  const onChange = (key: string) => {
    console.log(key);
  };
  const onEdit = () => {
    setItems([
      { label: "new tab", children: <ContentOrderDetail />, key: "1" },
    ]);
  };
  return (
    <div className="order-detail">
      <Tabs
        type="editable-card"
        onChange={onChange}
        items={items}
        onEdit={onEdit}
      />
    </div>
  );
};

export default OrderDetail;
