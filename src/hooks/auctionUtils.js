export const sortListings = (listings, sortOption) => {
  let sortedListings = [...listings];

  switch (sortOption) {
    case 'ending_soon':
      sortedListings.sort((a, b) => {
        const dateA = new Date(a.endsAt || Date.now());
        const dateB = new Date(b.endsAt || Date.now());
        return dateA - dateB;
      });
      break;

    case 'latest_added':
      sortedListings = listings.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
      break;

    case 'highest_bid':
      sortedListings.sort(
        (a, b) => (b._count?.bids || 0) - (a._count?.bids || 0)
      );
      break;

    default:
      break;
  }
  return sortedListings;
};

export const filterByCategory = (listings, category) => {
  return listings.filter((listing) =>
    listing.tags?.some((tag) => tag.toLowerCase() === category.toLowerCase())
  );
};

export const searchListings = (listings, query) => {
  if (!query) return listings;

  return listings.filter((item) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });
};
