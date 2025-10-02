Context

There are 3 services
1. main-services, create order & produce event with topic "order"
2. log-order-services, create log order, consume topic order
3. notifications-services, create notification for order, consume topic order


- Database -> postgresql

1. execute DDL below: 

CREATE TABLE public."order" (
	id serial4 NOT NULL,
	"productId" int4 NOT NULL,
	quantity int4 NULL,
	price int8 NULL,
	tax int8 NULL,
	"totalPrice" int8 NULL,
	status varchar NULL,
	"createdAt" date NULL,
	"updatedAt" date NULL,
	CONSTRAINT order_pk PRIMARY KEY (id)
);

CREATE TABLE public.notifications (
	id serial4 NOT NULL,
	"orderId" int4 NULL,
	noted varchar NOT NULL,
	"createdAt" date NULL,
	"updatedAt" date NULL,
	CONSTRAINT notifications_pk PRIMARY KEY (id)
);

CREATE TABLE public.orderstate (
	id serial4 NOT NULL,
	"orderId" int4 NULL,
	remark varchar NULL,
	status varchar NULL,
	"createdAt" date NULL,
	"updatedAt" date NULL,
	CONSTRAINT orderstate_pk PRIMARY KEY (id)
);


2. go to root folder main-services
	-> npm install
3. go to root folder log-order-services
	-> npm install
4. go to root folder notifications-services
	-> npm install

5. docker compose up (turn on the kafka broker server)
6. docker exec -it broker \
  kafka-topics --create \
  --bootstrap-server localhost:9092 \
  --replication-factor 1 \
  --partitions 3 \
  --topic order

  (create new topic named order)
7. docker exec -it broker \
  kafka-topics --list \
  --bootstrap-server localhost:9092

(check list of topic)

8. execute api --> localhost:3000/order/create
method --> POST
body --> {
    "productId": 11,
    "price": 2000,
    "quantity": 10
}