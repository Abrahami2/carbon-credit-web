import { MARKETPLACES } from "./constants";

const CalculateSkipAndLimit = (page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const limit = pageSize;
  return { skip, limit };
};

const GetMarketplaces = Object.fromEntries(
  Object.entries(MARKETPLACES).map(([key, value]) => [value, key])
);

const GetMarketplaceLabel = (marketplaceId) => {
  return Object.keys(MARKETPLACES).find(key => MARKETPLACES[key] === marketplaceId) || marketplaceId;
};

const DefaultProfileId = (store) => {
  if (!store?.profiles?.length) return null;

  const usProfile = store.profiles.find(profile => GetMarketplaceLabel(profile.marketplaceId) === "US");
  return usProfile ? usProfile.profileId : store.profiles[0].profileId;
};
  

const UpdateData = (data) => {
  return data?.map((item) => ({
    ...item,
    marketplaceId: GetMarketplaces[item.marketplaceId] || item.marketplaceId,
  }));
};

export {
  CalculateSkipAndLimit,
  GetMarketplaceLabel,
  DefaultProfileId,
  UpdateData
};
