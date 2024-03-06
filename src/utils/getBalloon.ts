export type Balloon = {
  backgroundId: string;
  city: string;
  id: string;
  latitude: number;
  logo_photos: string;
  longitude: number;
  name: string;
  phone_number: string;
  street_addr: string;
};

export const getBalloon = ({
  backgroundId,
  city,
  id,
  latitude,
  logo_photos,
  longitude,
  name,
  phone_number,
  street_addr,
}: Balloon) => {
  return `<div class="balloon">
    <a href="/foodwagon-online-shop/#/restaurant/${id}/product/${backgroundId}" class="balloon__link"/>
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
    <div>${longitude.toFixed(6)}, ${latitude.toFixed(6)} </div>
  </div>`;
};
