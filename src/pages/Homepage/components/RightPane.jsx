import DashPanel from "./DashPanel"

const RightPane = (props) => {
  return (
    <div className="bg-inherit p-2 h-full max-h-full overflow-hidden">
      <div className="h-full w-full bg-white rounded-xl border-gray-300 border-[1px] grid grid-rows-[250px_1fr]">
        <DashPanel />
      </div>
    </div>
  )
}

export default RightPane;
