import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { loadSchemaAsync, selectFeature, updateFeatureSetting } from "./featureSlice";
import { Feature } from "./Feature";
import { Row } from "react-bootstrap";

const FeatureContainer = () => {
  const dispatch = useDispatch();
  dispatch(loadSchemaAsync());
  const updateSetting = (e) => dispatch(updateFeatureSetting(e));
  const features = useSelector(selectFeature);
  return (
    <>
      {map(features.schema, (setting, settingName) => (
        <Row key={settingName}>
          <h3>{settingName}</h3>
          {map(setting.features, (feature, index) =>
            Feature({
              ...feature,
              key: [settingName, "features", index].join("."),
              eventHandler: updateSetting,
            })
          )}
        </Row>
      ))}
    </>
  );
};

export default FeatureContainer;
