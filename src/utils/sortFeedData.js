function sortFeedData (raw) {
  const unsorted = raw.reduce((prev, curr) => {
    return (prev) ? curr.concat(prev) : curr
  })

  return sorted = unsorted.sort((a,b) => (
    a.data.created_utc - b.data.created_utc)
  ).reverse()
}

module.exports = sortFeedData
