import React, { useEffect, useState } from "react";
import { Row, Col, Input, List } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useAction from "../../redux/useActions";
import removeAccents from "../../const/RemoveAccent";
import "./ModalAddMaterial.scss";

const ModalAddMaterial: React.FC<{ visible: boolean }> = ({ visible }) => {
  const dispatch = useDispatch();
  const actions = useAction();
  const [selectedMaterial, setSelectedMaterial] = useState<any>();
  const selectedMaterials = useSelector(
    (state: any) => state.material.selectedMaterials
  );
  const Dbmaterials = useSelector((state: any) => state.material.materials);
  const [materials, setMaterial] = useState(Dbmaterials);
  const handleSelectMaterial = (material: any) => {
    setSelectedMaterial(material);
    console.log(selectedMaterials, "materal", material);
    dispatch(
      actions.MaterialActions.selectedMaterial([...selectedMaterials, material])
    );
  };
  const handleSearchMaterial = (e: any) => {
    let filterMaterial: any[] = [];
    filterMaterial = materials.filter((material: any) => {
      const newMaterial = removeAccents(
        material.NameMaterial
      ).toLocaleLowerCase();
      const searchMaterial = removeAccents(e.target.value).toLocaleLowerCase();
      return newMaterial.includes(searchMaterial);
    });
    if (e.target.value) {
      setMaterial(filterMaterial);
    } else {
      setMaterial(Dbmaterials);
    }
  };
  return (
    <div>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <Input.Search
            placeholder="Tìm kiếm nguyên liệu ..."
            enterButton="Tìm kiếm"
            size="middle"
            onChange={handleSearchMaterial}
          />
        </Col>
        <Col span={24}>
          <Input
            placeholder="Thêm nguyên liệu"
            size="middle"
            value={selectedMaterial ? selectedMaterial.NameMaterial : ""}
          />
        </Col>
        <div
          style={{
            maxHeight: "200px",
            width: "100%",
            overflowY: "auto",
            overflow: "hidden",
          }}
        >
          <List
            dataSource={materials}
            renderItem={(material: any) => (
              <List.Item onClick={() => handleSelectMaterial(material)}>
                <div>{material.NameMaterial}</div>
                <div>{material.Unit}</div>
              </List.Item>
            )}
          />
        </div>
      </Row>
    </div>
  );
};
export default ModalAddMaterial;
