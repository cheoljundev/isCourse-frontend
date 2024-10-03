export default function MemberItem({modal, member, onclick}) {
  return (
    <button className="flex justify-between btn btn-outline h-auto" onClick={()=>onclick(member.id)}>
      <div className="flex gap-x-3 items-center">
        <span>{member.username}</span>
        <span>{member.nickname}</span>
      </div>
    </button>
  )
}