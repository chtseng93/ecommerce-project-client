import React from "react"
import '../../styles/Paginator.css'

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
	const pageNumbers = Array.from({ length: totalPages }, (x, i) => i + 1)
	return (
		<nav aria-label="Page navigation">
			<ul className="pagination pagination-sm justify-content-center">
				{pageNumbers.map((pageNumber) => (
					<li
						key={pageNumber}
						className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
						<button onClick={() => onPageChange(pageNumber)} className="page-links">
							{pageNumber}
						</button>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Paginator
