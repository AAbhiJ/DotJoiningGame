import TheveninComps from '../../components/practicalPlayground/ThevininComps'
import BaseCanvas from '../../components/threejs/utils/BaseCanvas'
import TheveninGateFloatingMenu from '../../components/threejs/utils/Thevenin/TheveninGateFloatingMenu'

const Thevenin = () => {

  return (
    <>
      <div className="container">
        <div className="floatingMenu">
          <TheveninGateFloatingMenu/>
        </div>
        <BaseCanvas>
          <TheveninComps/>
        </BaseCanvas>
      </div>
    </>
  )
}

export default Thevenin