let sort = 'date-desc'

getBlogPosts()

function getBlogPosts() {
  fetch('/blog-posts.json').then(response => response.json()).then((posts) => {
    blogPosts = posts
    filteredPosts = blogPosts
    showBlogPosts()
  })
}

function getTableBody() {
  try {
  return document.getElementById('blogrolltablebody')
  } catch (e) {
    console.error(e);
    return null;
  }
}

function createBlogPostRow(post) {
  const row = document.createElement('tr')

  const titleLink = document.createElement('a')
  titleLink.href = post.link
  titleLink.textContent = post.title

  const titleCell = document.createElement('td')
  titleCell.appendChild(titleLink)
  row.appendChild(titleCell)

  const categoryCell = document.createElement('td')
  categoryCell.textContent = post.category
  row.appendChild(categoryCell)

  const dateCell = document.createElement('td')
  dateCell.textContent = post.date
  row.appendChild(dateCell)

  return row
}

function showBlogPosts() {
  filteredPosts.sort(sortPosts)
  const tableBody = getTableBody()
  if (tableBody != null) {
    tableBody.innerHTML = ''
    filteredPosts.forEach((post) => {
      const blogPostRow = createBlogPostRow(post)
      tableBody.appendChild(blogPostRow)
    })
  }
  showSortArrow()
}

function showSortArrow() {
  const re = /sort-(a|de)sc/

  const titleColumnHeader = document.getElementById('titlecolumnheader')
  let titleColumnHeaderClassName = titleColumnHeader.className
  titleColumnHeaderClassName = titleColumnHeaderClassName.replace(re, '')

  const categoryColumnHeader = document.getElementById('categorycolumnheader')
  let categoryColumnHeaderClassName = categoryColumnHeader.className
  categoryColumnHeaderClassName = categoryColumnHeaderClassName.replace(re, '')

  const dateColumnHeader = document.getElementById('datecolumnheader')
  let dateColumnHeaderClassName = dateColumnHeader.className
  dateColumnHeaderClassName = dateColumnHeaderClassName.replace(re, '')

  switch(sort) {
    case 'title-desc':
      titleColumnHeaderClassName += ' sort-desc'
      break;
    case 'title-asc':
      titleColumnHeaderClassName += ' sort-asc'
      break;

      case 'category-desc':
    categoryColumnHeaderClassName += ' sort-desc'
      break;
    case 'category-asc':
      categoryColumnHeaderClassName += ' sort-asc'
      break;

    case 'date-asc':
      dateColumnHeaderClassName += ' sort-asc'
      break;
    case 'date-desc':
      dateColumnHeaderClassName += ' sort-desc'
      break;
  }
  titleColumnHeader.className = titleColumnHeaderClassName
  categoryColumnHeader.className = categoryColumnHeaderClassName
  dateColumnHeader.className = dateColumnHeaderClassName
}

function sortColumn(col) {
  if (col === 'title') {
    if (sort.includes('asc')) {
      sort = 'title-desc'
    } else {
      sort = 'title-asc'
    }
  } else if (col === 'category') {
    if (sort.includes('asc')) {
      sort = 'category-desc'
    } else {
      sort = 'category-asc'
    }
  } else if (col.includes('date')) {
    if (sort.includes('desc')) {
      sort = 'date-asc'
    } else {
      sort = 'date-desc'
    }
  }
  showBlogPosts()
}

function sortPosts(a, b) {
  switch(sort) {
    case 'title-desc':
      return b.title.localeCompare(a.title)
      break;
    case 'title-asc':
      return a.title.localeCompare(b.title)
      break;
    case 'category-desc':
      return b.category.localeCompare(a.category)
      break;
    case 'category-asc':
      return a.category.localeCompare(b.category)
      break;
    case 'date-asc':
      return new Date(a.date).getTime() - new Date(b.date).getTime()
      break;
    case 'date-desc':
      return new Date(b.date).getTime() - new Date(a.date).getTime()
      break;
  }
}

function filterBlogRoll() {
  const filterText = getFilterValue()
  filteredPosts = blogPosts.filter(post => post.title.toLowerCase().includes(filterText))
  showBlogPosts()
}

function getFilterValue() {
  const filterInput = document.getElementById('blogrollfilter')
  const filterText = filterInput.value
  return filterText.toLowerCase().trim()
}
