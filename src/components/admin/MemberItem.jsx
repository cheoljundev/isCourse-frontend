export default function MemberItem({modal}) {
  return (
    <button className="flex justify-between btn btn-outline h-auto" onClick={()=>modal.current.open()}>
      <div className="flex gap-x-3 items-center">
        <span>닉네임</span>
      </div>
    </button>
  )
}