export const getBalloon = (
  id,
  name,
  logo_photos,
  phone_number,
  street_addr,
  latitude,
  longitude,
  backgroundId,
  city,
) => {
  return `<div class="balloon">
    <a href="/foodwagon/restaurant/${id}/product/${backgroundId}" class="balloon__link"/>
        <div class="balloon__logo">
          <img
            class="balloon__image"
            src=${process.env.PUBLIC_URL}${logo_photos}
            alt=${name}
          />
        </div>
        <div class="balloon__rest">${name}</div>
    </a>

    <div class="balloon__contact">
      phone:
      <a class="balloon__contact-link" href="tel:${phone_number}">
        ${phone_number}
      </a>
    </div>
    <div class="balloon__address">${city}, ${street_addr}</div>
    <div>${latitude.toFixed(5)}, ${longitude.toFixed(5)}</div>
  </div>`;
};
