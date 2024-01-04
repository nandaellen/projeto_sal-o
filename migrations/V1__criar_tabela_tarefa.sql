create table fornecedor (
 	CNPJ int PRIMARY KEY AUTO_INCREMENT,
    Noforne varchar(300) not null,
    Nofant varchar(600)
);

create table cliente (
 	CPF int PRIMARY KEY AUTO_INCREMENT,
    Nomecli varchar(300) not null,
    Data_agend varchar(600)
);
