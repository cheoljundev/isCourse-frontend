export default function Pagination({page, setPage, totalPages, isFirst, isLast}) {
  function handlePrev() {
    if (!isFirst) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function handleNext() {
    if (!isLast) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function handlePage() {
    setPage(page);
  }

  function handleLastPage() {
    setPage(totalPages - 1);
  }

  let prevClass = "join-item btn";
  let nextClass = "join-item btn";
  if (isFirst) {
    prevClass += " btn-disabled";
  }
  if (isLast) {
    nextClass += " btn-disabled";
  }
  return (
    <div className="join m-4 mx-auto flex justify-center">
      <button onClick={handlePrev} className={prevClass}>«</button>
      <button onClick={handlePage} className="join-item btn">{page + 1}</button>
      <button className="join-item btn btn-disabled">...</button>
      <button onClick={handleLastPage} className="join-item btn">{totalPages}</button>
      <button onClick={handleNext} className={nextClass}>»</button>
    </div>
  )
}