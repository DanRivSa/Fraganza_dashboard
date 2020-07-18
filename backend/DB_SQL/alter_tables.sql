--SECUENCIAS

CREATE SEQUENCE ada_sec_id_proveedor as SMALLINT
 MINVALUE 1
 MAXVALUE 50
 NO CYCLE
 OWNED BY ada_proveedor.id_prov;
 ;
ALTER TABLE ada_proveedor
ALTER COLUMN id_prov SET DEFAULT nextval('ada_sec_id_proveedor');

CREATE SEQUENCE ada_sec_id_membresia as SMALLINT
 MINVALUE 1
 MAXVALUE 50
 NO CYCLE
 OWNED BY ada_membresia.id_m;
 ;
ALTER TABLE ada_membresia
ALTER COLUMN id_m SET DEFAULT nextval('ada_sec_id_membresia');


CREATE SEQUENCE ada_sec_id_otros_ing as SMALLINT
 MINVALUE 1
 MAXVALUE 100
 NO CYCLE
 OWNED BY ada_otros_ing.cas_oi;
ALTER TABLE ada_otros_ing
ALTER COLUMN cas_oi SET DEFAULT nextval('ada_sec_id_otros_ing');

CREATE SEQUENCE ada_sec_id_pais as SMALLINT
 MINVALUE 1
 MAXVALUE 240
 NO CYCLE
 OWNED BY ada_pais.id_pais;
ALTER TABLE ada_pais
ALTER COLUMN id_pais SET DEFAULT nextval('ada_sec_id_pais');

CREATE SEQUENCE ada_sec_id_productor as SMALLINT
 MINVALUE 1
 MAXVALUE 50
 NO CYCLE
 OWNED BY ada_productor.id_prod;
ALTER TABLE ada_productor
ALTER COLUMN id_prod SET DEFAULT nextval('ada_sec_id_productor');

CREATE SEQUENCE ada_sec_id_perfume as SMALLINT
MINVALUE 1
MAXVALUE 50
NO CYCLE
OWNED BY ada_perfume.id_perfume;
ALTER TABLE ada_perfume
ALTER COLUMN id_perfume SET DEFAULT nextval('ada_sec_id_perfume');

CREATE SEQUENCE ada_sec_id_intensidad as SMALLINT
MINVALUE 1
MAXVALUE 60
NO CYCLE
OWNED BY ada_intensidad.id_int;
ALTER TABLE ada_intensidad
ALTER COLUMN id_int SET DEFAULT nextval('ada_sec_id_intensidad');

CREATE SEQUENCE ada_sec_id_presentacion_p as SMALLINT
MINVALUE 1
MAXVALUE 60
NO CYCLE
OWNED BY ada_presentacion_p.id_present;
ALTER TABLE ada_presentacion_p
ALTER COLUMN id_present SET DEFAULT nextval('ada_sec_id_presentacion_p');


CREATE SEQUENCE ada_sec_id_familia as SMALLINT
MINVALUE 1
MAXVALUE 10
NO CYCLE
OWNED BY ada_familia_olfativa.id_familia;
ALTER TABLE ada_familia_olfativa
ALTER COLUMN id_familia SET DEFAULT nextval('ada_sec_id_familia');

CREATE SEQUENCE ada_sec_id_pc as SMALLINT
MINVALUE 1
MAXVALUE 10
NO CYCLE
OWNED BY ada_familia_olfativa.id_familia;
ALTER TABLE ada_familia_olfativa
ALTER COLUMN id_familia SET DEFAULT nextval('ada_sec_id_familia');

CREATE SEQUENCE ada_sec_id_criterio as SMALLINT
MINVALUE 1
MAXVALUE 5
NO CYCLE
OWNED BY ada_criterio_eval.id_criterio;
ALTER TABLE ada_criterio_eval
ALTER COLUMN id_criterio SET DEFAULT nextval('ada_sec_id_criterio');


CREATE SEQUENCE ada_sec_numero_contrato as SMALLINT
INCREMENT BY 5
MINVALUE 1000
MAXVALUE 2000
NO CYCLE
OWNED by ada_contrato.numero_contrato;
ALTER TABLE ada_contrato
ALTER COLUMN numero_contrato SET DEFAULT nextval('ada_sec_numero_contrato');

CREATE SEQUENCE ada_sec_ada_renueva as SMALLINT
MINVALUE 1
MAXVALUE 50
NO CYCLE
OWNED BY ada_renueva.id_ren;
ALTER TABLE ada_renueva
ALTER COLUMN id_ren SET DEFAULT nextval('ada_sec_ada_renueva');


CREATE SEQUENCE ada_sec_sku_presentacion_e as SMALLINT
INCREMENT 5
MINVALUE 100
MAXVALUE 500
NO CYCLE
OWNED BY ada_presentacion_e.sku;
ALTER TABLE ada_presentacion_e
ALTER COLUMN sku SET DEFAULT nextval('ada_sec_sku_presentacion_e');


CREATE SEQUENCE ada_sec_id_modif as SMALLINT
MINVALUE 1
MAXVALUE 10
NO CYCLE
OWNED BY ada_modificador_envio.id_modif;
ALTER TABLE ada_modificador_envio
ALTER COLUMN id_modif SET DEFAULT nextval('ada_sec_id_modif');


CREATE SEQUENCE ada_sec_id_pedido as SMALLINT
MINVALUE 1
MAXVALUE 100
NO CYCLE
OWNED BY ada_pedido.id_pedido;
ALTER TABLE ada_pedido
ALTER COLUMN id_pedido SET DEFAULT nextval('ada_sec_id_pedido');


CREATE SEQUENCE ada_sec_nro_factura as SMALLINT
INCREMENT 5
MINVALUE 1000
MAXVALUE 2500
NO CYCLE
OWNED BY ada_pedido.nro_factura;
ALTER TABLE ada_pedido
ALTER COLUMN nro_factura SET DEFAULT nextval('ada_sec_nro_factura');


CREATE SEQUENCE ada_sec_id_asoc as SMALLINT
MINVALUE 1
MAXVALUE 5
NO CYCLE
OWNED BY ada_asoc_nacional.id_asoc;
ALTER TABLE ada_asoc_nacional
ALTER COLUMN id_asoc SET DEFAULT nextval('ada_sec_id_asoc');


CREATE SEQUENCE ada_sec_id_perfumista as SMALLINT
MINVALUE 1
MAXVALUE 20
NO CYCLE
OWNED BY ada_perfumista.id_perfumista;
ALTER TABLE ada_perfumista
ALTER COLUMN id_perfumista SET DEFAULT nextval('ada_sec_id_perfumista');



--ALTER TABLE

ALTER TABLE ada_esencia
ADD CONSTRAINT FK_id_prov FOREIGN KEY (id_prov)
REFERENCES ada_proveedor (id_prov);


ALTER TABLE ada_perfumista
ADD CONSTRAINT FK_id_pais FOREIGN KEY (id_pais)
REFERENCES ada_pais (id_pais);


ALTER TABLE ada_productor
ADD CONSTRAINT FK_id_asoc FOREIGN KEY (id_asoc)
REFERENCES ada_asoc_nacional (id_asoc);


ALTER TABLE ada_proveedor
ADD CONSTRAINT FK_id_pais FOREIGN KEY (id_pais)
REFERENCES ada_pais (id_pais);
ALTER TABLE ada_proveedor
ADD CONSTRAINT FK_id_asoc FOREIGN KEY (id_asoc)
REFERENCES ada_asoc_nacional (id_asoc);


ALTER TABLE ada_perfume
ADD CONSTRAINT FK_id_prod FOREIGN KEY (id_prod)
REFERENCES ada_productor (id_prod);


ALTER TABLE ada_intensidad
ADD CONSTRAINT FK_id_perfume FOREIGN KEY (id_perfume)
REFERENCES ada_perfume (id_perfume);


ALTER TABLE ada_presentacion_p
ADD CONSTRAINT FK_id_perfume_int FOREIGN KEY (id_perfume,id_int)
REFERENCES ada_intensidad (id_perfume,id_int);


ALTER TABLE ada_resutado_eval
ADD CONSTRAINT FK_id_prod FOREIGN KEY (id_prod)
REFERENCES ada_perfume (id_perfume);
ALTER TABLE ada_resutado_eval
ADD CONSTRAINT FK_id_prov FOREIGN KEY (id_prov)
REFERENCES ada_proveedor (id_prov);


ALTER TABLE ada_origen
ADD CONSTRAINT FK_id_pais FOREIGN KEY (id_pais)
REFERENCES ada_pais (id_pais);
ALTER TABLE ada_origen
ADD CONSTRAINT FK_cas FOREIGN KEY (cas)
REFERENCES ada_esencia (cas);


ALTER TABLE ada_monolitico
ADD CONSTRAINT FK_cas_ep FOREIGN KEY (cas_ep)
REFERENCES ada_esencia_perfume (cas_ep);
ALTER TABLE ada_monolitico
ADD CONSTRAINT FK_id_perfume FOREIGN KEY (id_perfume)
REFERENCES ada_perfume (id_perfume);


ALTER TABLE ada_familia_esencia
ADD CONSTRAINT FK_id_familia FOREIGN KEY (id_familia)
REFERENCES ada_familia_olfativa (id_familia);
ALTER TABLE ada_familia_esencia
ADD CONSTRAINT FK_cas FOREIGN KEY (cas)
REFERENCES ada_esencia (cas);


ALTER TABLE ada_perfume_familia
ADD CONSTRAINT FK_id_familia FOREIGN KEY (id_familia)
REFERENCES ada_familia_olfativa (id_familia);
ALTER TABLE ada_perfume_familia
ADD CONSTRAINT FK_id_perfume FOREIGN KEY (id_perfume)
REFERENCES ada_perfume (id_perfume);


ALTER TABLE ada_perfume_nota
ADD CONSTRAINT FK_id_perfume FOREIGN KEY (id_perfume)
REFERENCES ada_perfume (id_perfume);
ALTER TABLE ada_perfume_nota
ADD CONSTRAINT FK_cas_ep FOREIGN KEY (cas_ep)
REFERENCES ada_esencia_perfume (cas_ep);


ALTER TABLE ada_perf_ing
ADD CONSTRAINT FK_id_perfume FOREIGN KEY (id_perfume)
REFERENCES ada_perfume (id_perfume);
ALTER TABLE ada_perf_ing
ADD CONSTRAINT FK_cas_ip FOREIGN KEY (cas_ip)
REFERENCES ada_ingrediente_p (cas_ip);


ALTER TABLE ada_prod_pais
ADD CONSTRAINT FK_id_pais FOREIGN KEY (id_pais)
REFERENCES ada_pais (id_pais);
ALTER TABLE ada_prod_pais
ADD CONSTRAINT FK_id_prod FOREIGN KEY (id_prod)
REFERENCES ada_productor (id_prod);


ALTER TABLE ada_contrato
ADD CONSTRAINT FK_id_prod FOREIGN KEY (id_prod)
REFERENCES ada_productor (id_prod);
ALTER TABLE ada_contrato
ADD CONSTRAINT FK_id_prov FOREIGN KEY (id_prov)
REFERENCES ada_proveedor (id_prov);


ALTER TABLE ada_renueva
ADD CONSTRAINT FK_renov FOREIGN KEY(id_prod,id_prov,numero_contrato)
REFERENCES ada_contrato (id_prod,id_prov,numero_contrato)
ON DELETE CASCADE;


ALTER TABLE ada_creador_perfume
ADD CONSTRAINT FK_id_perfume FOREIGN KEY (id_perfume)
REFERENCES ada_perfume (id_perfume);
ALTER TABLE ada_creador_perfume
ADD CONSTRAINT FK_perfumista FOREIGN KEY (id_perfumista)
REFERENCES ada_perfumista (id_perfumista);


ALTER TABLE ada_membresia
ADD CONSTRAINT FK_id_prod FOREIGN KEY (id_prod)
REFERENCES ada_productor (id_prod);
ALTER TABLE ada_membresia
ADD CONSTRAINT FK_id_prov FOREIGN KEY (id_prov)
REFERENCES ada_proveedor (id_prov);


ALTER TABLE ada_alternativa_pago
ADD CONSTRAINT FK_id_prov FOREIGN KEY (id_prov)
REFERENCES ada_proveedor (id_prov);


ALTER TABLE ada_cuota
ADD CONSTRAINT FK_cuota FOREIGN KEY (id_prov,metodo_pago)
REFERENCES ada_alternativa_pago (id_prov,metodo_pago);


ALTER TABLE ada_presentacion_e
ADD CONSTRAINT FK_cas FOREIGN KEY (cas)
REFERENCES ada_esencia (cas);
ALTER TABLE ada_presentacion_e
ADD CONSTRAINT FK_cas_oi FOREIGN KEY (cas_oi)
REFERENCES ada_otros_ing (cas_oi);


ALTER TABLE ada_alternativa_envio
ADD CONSTRAINT FK_id_pais FOREIGN KEY (id_pais)
REFERENCES ada_pais (id_pais);
ALTER TABLE ada_alternativa_envio
ADD CONSTRAINT FK_id_prov FOREIGN KEY (id_prov)
REFERENCES ada_proveedor (id_prov);


ALTER TABLE ada_modificador_envio
ADD CONSTRAINT FK_modif_e FOREIGN KEY(id_prov,id_pais,tipo_envio)
REFERENCES ada_alternativa_envio (id_prov,id_pais,tipo_envio);


ALTER TABLE ada_contratacion_prod
ADD CONSTRAINT FK_contrac_p FOREIGN KEY (id_prod,id_prov,numero_contrato)
REFERENCES ada_contrato (id_prod,id_prov,numero_contrato);
ALTER TABLE ada_contratacion_prod
ADD CONSTRAINT FK_cas_contract FOREIGN KEY (cas)
REFERENCES ada_esencia (cas);
ALTER TABLE ada_contratacion_prod
ADD CONSTRAINT FK_cas_oi FOREIGN KEY (cas_oi)
REFERENCES ada_otros_ing (cas_oi);


ALTER TABLE ada_contratacion_ap
ADD CONSTRAINT FK_contrac_ap FOREIGN KEY (id_prod,id_prov,numero_contrato)
REFERENCES ada_contrato (id_prod,id_prov,numero_contrato);
ALTER TABLE ada_contratacion_ap
ADD CONSTRAINT FK_prov_pago FOREIGN KEY (id_prov2,metodo_pago)
REFERENCES ada_alternativa_pago (id_prov,metodo_pago);


ALTER TABLE ada_contratacion_me
ADD CONSTRAINT FK_contrac_me FOREIGN KEY (id_prod,id_prov,numero_contrato)
REFERENCES ada_contrato (id_prod,id_prov,numero_contrato);
ALTER TABLE ada_contratacion_me
ADD CONSTRAINT FK_prov_pais FOREIGN KEY (id_prov2,id_pais,tipo_envio)
REFERENCES ada_alternativa_envio (id_prov,id_pais,tipo_envio);


ALTER TABLE ada_escala
ADD CONSTRAINT FK_id_prod FOREIGN KEY (id_prov)
REFERENCES ada_proveedor (id_prov);


ALTER TABLE ada_eval_criterio
ADD CONSTRAINT FK_id_prov FOREIGN KEY (id_prov)
REFERENCES ada_proveedor (id_prov);
ALTER TABLE ada_eval_criterio
ADD CONSTRAINT FK_id_criterio FOREIGN KEY (id_criterio)
REFERENCES ada_criterio_eval (id_criterio);


ALTER TABLE ada_pedido
ADD CONSTRAINT FK_contrac_p
FOREIGN KEY (id_prod1,id_prov1,numero_contrato1,id_prov2,metodo_pago)
REFERENCES ada_contratacion_ap (id_prod,id_prov,numero_contrato,id_prov2,metodo_pago);
ALTER TABLE ada_pedido
ADD CONSTRAINT FK_contrac_me
FOREIGN KEY(id_prod3,id_prov3,numero_contrato2,id_prov4,id_pais,tipo_envio)
REFERENCES ada_contratacion_me (id_prod,id_prov,numero_contrato,id_prov2,id_pais,tipo_envio);


ALTER TABLE ada_det_pedido
ADD CONSTRAINT FK_id_pedido FOREIGN KEY (id_pedido)
REFERENCES ada_pedido (id_pedido);
ALTER TABLE ada_det_pedido
ADD CONSTRAINT FK_sku FOREIGN KEY (sku)
REFERENCES ada_presentacion_e (sku);


ALTER TABLE ada_pago
ADD CONSTRAINT FK_id_pedido FOREIGN KEY (id_pedido)
REFERENCES ada_pedido (id_pedido);


ALTER TABLE ada_familia_palabra
ADD CONSTRAINT FK_id_familia FOREIGN KEY (id_familia)
REFERENCES ada_familia_olfativa (id_familia);
ALTER TABLE ada_familia_palabra
ADD CONSTRAINT FK_id_pc FOREIGN KEY (id_pc)
REFERENCES ada_palabra_clave (id_pc);


ALTER TABLE ada_otros_esencia
ADD CONSTRAINT FK_cas_oi FOREIGN KEY (cas_oi)
REFERENCES ada_otros_ing (cas_oi);
ALTER TABLE ada_otros_esencia
ADD CONSTRAINT FK_cas FOREIGN KEY (cas)
REFERENCES ada_esencia (cas);
