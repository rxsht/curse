create table roles (
    id bigserial primary key,
    name varchar(30) not null unique
);

create table users (
    id bigserial primary key,
    email varchar(150) not null unique,
    password_hash varchar(255),
    full_name varchar(120) not null,
    phone varchar(30),
    enabled boolean not null default true,
    created_at timestamp not null default now()
);

create table user_roles (
    user_id bigint not null references users(id) on delete cascade,
    role_id bigint not null references roles(id) on delete cascade,
    primary key (user_id, role_id)
);

create table guide_profiles (
    id bigserial primary key,
    user_id bigint not null unique references users(id) on delete cascade,
    bio text,
    years_of_experience int not null default 0,
    languages varchar(255),
    verified boolean not null default false
);

create table categories (
    id bigserial primary key,
    name varchar(80) not null unique
);

create table locations (
    id bigserial primary key,
    city varchar(100) not null,
    country varchar(100) not null,
    latitude numeric(10, 7),
    longitude numeric(10, 7),
    address varchar(255)
);

create table tours (
    id bigserial primary key,
    guide_id bigint not null references users(id),
    category_id bigint not null references categories(id),
    location_id bigint not null references locations(id),
    title varchar(150) not null,
    description text not null,
    price numeric(12, 2) not null,
    duration_hours int not null,
    capacity int not null,
    active boolean not null default true,
    created_at timestamp not null default now()
);

create table bookings (
    id bigserial primary key,
    tour_id bigint not null references tours(id),
    tourist_id bigint not null references users(id),
    participants int not null,
    status varchar(30) not null,
    booked_at timestamp not null default now(),
    tour_date date not null
);

create table payments (
    id bigserial primary key,
    booking_id bigint not null unique references bookings(id),
    amount numeric(12, 2) not null,
    status varchar(30) not null,
    provider varchar(50) not null,
    created_at timestamp not null default now()
);

create table reviews (
    id bigserial primary key,
    tour_id bigint not null references tours(id),
    booking_id bigint not null unique references bookings(id),
    author_id bigint not null references users(id),
    rating int not null check (rating between 1 and 5),
    comment text,
    created_at timestamp not null default now()
);

create table ratings_summary (
    tour_id bigint primary key references tours(id),
    average_rating numeric(4, 2) not null default 0,
    total_reviews int not null default 0
);

create table refresh_tokens (
    id bigserial primary key,
    user_id bigint not null references users(id) on delete cascade,
    token varchar(255) not null unique,
    expires_at timestamp not null,
    revoked boolean not null default false
);

insert into roles(name) values ('USER'), ('GUIDE'), ('ADMIN');
