import React, { useState, useEffect } from "react";
import "./cuidadosParaTuPerro.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

export const CuidadosParaTuPerro = () => {
  const [consejo, setConsejo] = useState("");
  const [loading, setLoading] = useState(true);
  const [aviso, setAviso] = useState("");
  const [showAntes, setShowAntes] = useState(false);
  const [showPreguntas, SetShowPreguntas] = useState(false);
  const [showAlimentacion, SetShowAlimentacion] = useState(false);
  const [showEducacion, SetShowEducacion] = useState(false);
  const [showEnfermedades, SetShowEnfermedades] = useState(false);
  const [showHigiene, SetShowHigiene] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let consejoIngles;
      try {
        const response = await axios.get(
          "https://dog-api.kinduff.com/api/facts"
        );
        consejoIngles = response.data.facts[0];
        const traduccionResponse = await axios.post(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=${encodeURIComponent(
            consejoIngles
          )}`
        );
        const traduccion = traduccionResponse.data[0][0][0];
        setConsejo(traduccion);
        setAviso("");
      } catch (error) {
        console.log(error);
        setConsejo(consejoIngles);
        setAviso(
          `Hemos sido víctimas de nuestro propio éxito, la página ha alcanzado su número máximo de traducciones por hoy. El dato curioso en su idioma original es:`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container id="cuidados_para_tu_perro">
      <h1>Cuidados Para Tu Perro</h1>
      <Row>
        <Col className="dato_curioso">
          <h2>El dato curioso</h2>
          {loading && <p>Cargando dato curioso...</p>}
          {consejo && (
            <>
              <p>{aviso}</p>
              <p>{consejo}</p>
            </>
          )}
        </Col>
        <Row className="cuidados_desplegables">
          <h2 onClick={() => setShowAntes(!showAntes)}>Antes de Adoptar</h2>
          <Col
            className={`desplegable antes_de_adoptar ${
              showAntes ? "show" : "hide"
            }`}
          >
            <h3>¿QUÉ DEBES SABER ANTES DE ADOPTAR?</h3>
            <p>
              Los perros son seres sensibles que necesitan de nuestra atención y
              cuidados. No te precipites y piénsalo tantas veces como haga falta
              antes de tomar una decisión, ya que tu compromiso debe durar toda
              la vida del animal. Piensa detenidamente si deseas un cachorro, un
              adulto o un anciano, e infórmate de las ventajas y desventajas de
              cada edad. Desde el momento de la adopción debes tener claro que
              tú eres la persona responsable de su bienestar y su educación.
              Enséñale a tener un comportamiento adecuado, no se trata de
              inculcarle obediencia absoluta, sino de que aprenda normas básicas
              de convivencia. El respeto, el cariño y un poco de paciencia son
              siempre buenos consejeros. En el caso de adoptar un cachorro,
              puede ser que su estado de salud no sea el òptimo. Debido al mal
              estado de perreras y abandono de estos pequeños puede llegar a
              estar en muy malas condiciones donde no reciben ni cuidados ni
              alimento necesario para su buena salud. Por lo tanto, esperamos
              comprendan que pueden venir enfermos y por debajo de su peso. Con
              ellos hay que tener un cuidado especial y mucha paciencia. Merecen
              nuestra ayuda.
            </p>
            <h3>EN SU NUEVO HOGAR</h3>
            <p>
              El traslado a su nuevo hogar puede ser una experiencia traumática
              para él. Realiza el cambio de la forma menos estresante posible,
              no hagas demasiado ruido ni le presentes a toda la familia, amigos
              a la vez. Hasta que no te ganes su confianza no le sueltes la
              correa cuando lo saques de paseo ya que el miedo puede hacer que
              tienda a escaparse. El cambio de alimentación debe realizarse de
              forma gradual, mezclando su antigua comida con cantidades cada vez
              mayores de la nueva. Conviene que se le administre la comida
              siempre a las mismas horas, repartido en 2-3 tomas diarias. Los
              piensos existentes en el mercado están diseñados para cubrir todas
              las necesidades de tu perro dependiendo de su tamaño, edad,
              actividad,? El agua deberás mantenerla en todo momento limpia y
              fresca.
            </p>
            <h3>IDENTIFICACIÓN</h3>
            <p>
              No olvides que existe toda una normativa de obligado cumplimiento
              en cuanto a la tenencia de animales de compañía, que incluye la
              identificación electrónica y censado de perros en el ayuntamiento
              del municipio de residencia habitual en el plazo de un mes desde
              su adquisición. Así mismo debes comunicar cualquier variación de
              los datos del Registro o situación del animal (baja por muerte o
              por traslado fuera de la comunidad autónoma, desaparición por
              pérdida o robo, etc.).
            </p>
            <h3>LA SALUD DE TU MASCOTA</h3>
            <p>
              El animal ha sido debidamente desparasitado, no obstante has de
              continuar este tratamiento cada tres meses durante toda su vida.
              Es importante seguir esta pauta correctamente puesto que los
              parásitos internos se contagian a las personas. La desparasitación
              externa es igualmente importante ya que nos permite controlar las
              pulgas, garrapatas y evitar la picadura del mosquito que trasmite
              la Leishmaniosis. Un perro sano se empieza a vacunar a las
              seis/ocho semanas de edad. Save a Life garantiza en los animales
              adultos la vacuna frente al moquillo o distemper canino,
              parvovirosis canina, hepatitis infecciosa canina, leptospirosis
              canina y traqueobronquitis infecciosa canina. Los cachorros
              llevarán al menos la primera vacuna (moquillo o distemper canino y
              parvovirosis canina) o estarán completamente vacunados, según la
              edad. Las vacunaciones posteriores se habrán de efectuar en el
              centro veterinario que consideres oportuno. Los animales deben ser
              revacunados anualmente. Un animal sano come correctamente y hace
              unos excrementos sólidos, no obstante, el cambio de vivienda puede
              suponer un estrés para él y es normal que en algunos casos sufra
              una diarrea transitoria y que esté algo asustado, pero esto no
              debería durar más de unos días, la mayoría se adaptan rápidamente
              a su nueva familia. En algunos casos las diarreas pueden ser con
              sangre, si es así, deben ser tratadas inmediatamente. En los
              cachorros es importante controlar la zona anal puesto que los
              excrementos se pueden secar e impedir que el animal defeque.
              Debemos revisar las orejas del animal y limpiarlas al menos una
              vez por semana, así evitaremos la otitis, enfermedad muy frecuente
              a cortas edades y en determinadas razas. La frecuencia de los
              baños no debe ser superior a los treinta días y siempre utilizar
              un champú específico para animales para no alterar el ph de su
              piel.
            </p>
            <h3>CONDICIONES</h3>
            <p>
              Los perros se entregan desparasitados, vacunados e identificados.
              Cuando hace falta envio, el precio se incrementará dependiendo del
              tipo de envio que se realice. Consultar en cada caso. Las
              esterilizaciones se pueden hacer con la protectora teniendo un
              coste más reducido.
            </p>
          </Col>
          <h2 onClick={() => SetShowPreguntas(!showPreguntas)}>
            Hazte las preguntas correctas
          </h2>
          <Col
            className={`desplegable preguntas_adopcion ${
              showPreguntas ? "show" : "hide"
            }`}
          >
            <h3>¿POR QUÉ QUIERO UNA MASCOTA?</h3>
            <p>
              ¿Te has hecho realmente esta pregunta? ¿No será sólo un capricho
              temporal? Ten en cuenta que una mascota es un ser vivo, que hay
              que cuidar y sobretodo querer y que va a estar con nosotros por
              bastantes años.
            </p>
            <h3>¿TENGO TIEMPO PARA UNA MASCOTA?</h3>
            <p>
              ¿Sales tarde de trabajar? ¿No podrás dedicarle el tiempo
              suficiente para un buen paseo, para jugar con la pelota? Plantéate
              estas cosas porque las mascotas sufren mucho con la soledad..
            </p>
            <h3>¿TENGO EL DINERO NECESARIO?</h3>
            <p>
              Calcula que sólo para empezar tienes que contar con: chip, las
              vacunas, los antiparasitarios, etc. Y anualmente has de vacunarlo
              más las veces que tengas que llevarle a consulta
            </p>
            <h3>¿PUEDES TENER UNA MASCOTA EN CASA?</h3>
            <p>
              ¿Vives en un piso pequeño? No te plantees entonces un perro
              grande, estará incómodo. ¿En tu comunidad de vecinos está
              permitido? Pregunta antes si se aceptan mascotas, puedes llevarte
              una sorpresa.
            </p>
            <h3>¿ES PARA TI UN BUEN MOMENTO PARA TENER UNA MASCOTA?</h3>
            <p>
              ¿Viajas mucho por trabajo? ¿Vas a cambiar pronto de trabajo y no
              sabes qué ritmo de vida vas a tener? Espera a estabilizarte para
              adquirir una mascota.
            </p>
            <h3>¿ESTÁS PREPARADO PARA CUIDARLE TODA SU VIDA?</h3>
            <p>
              Recuerda que adquirir una mascota es sinónimo de adquirir la
              responsabilidad de cuidarle durante todas las etapas de su vida,
              desde que es un cachorro hasta su vejez.
            </p>
            <h3>
              ¿TIENES A ALGUIEN QUE CUIDE DE TU MASCOTA CUANDO ESTÉS FUERA?
            </h3>
            <p>
              ¿Tienes algún familiar para quedarse con tu mascota durante unos
              días? Y, si no es así ¿tienes localizada alguna residencia canina?
              O, por último, adaptar tu estilo de vida a tu nueva circunstancia
              y llevártelo contigo
            </p>
          </Col>
          <h2 onClick={() => SetShowAlimentacion(!showAlimentacion)}>
            Alimentación
          </h2>
          <Col
            className={`desplegable alimentacion ${
              showAlimentacion ? "show" : "hide"
            }`}
          >
            <p>
              La administración de una dieta adecuada a la edad, actividad y
              estado de nuestro buen amigo es, sin lugar a dudas, un camino
              seguro hacia la salud.
            </p>
            <p>
              Las comidas caseras, las "mezclas maravillosas" utilizadas durante
              largos años de convivencia entre el hombre y el perro, han sido
              prácticamente desterradas como opción, tanto por los profesionales
              como por una gran mayoría de propietarios.
            </p>
            <p>
              La elección de una dieta comercial de alta calidad nos asegurará
              que el organismo del animal dispondrá de todos los recursos para
              defenderse de agresiones externas; una buena alimentación proveerá
              al animal de todos los elementos necesarios para que ningún
              aparato o sistema orgánico disminuya en su rendimiento o presente
              el menor atisbo de problema.
            </p>

            <h3>Alimentación de calidad</h3>
            <p>
              Pero por desgracia, algo tan simple como es la elección de un
              alimento de calidad y adecuado a nuestro animal, sigue sin
              cumplirse:
            </p>
            <ul>
              <li>
                "Picoteos", sobras de nuestras comidas, alimentos comerciales
                baratos o inadecuados...
              </li>
              <li>
                Múltiples fallos que ponen a prueba diariamente la salud del
                animal; estas inadecuadas actuaciones, si se mantienen en el
                tiempo, provocarán un importante desequilibrio de nutrientes:
                excesos de energía y proteínas, deficiencia de vitaminas... ¡¡un
                desastre!!.
              </li>
            </ul>
            <p>
              Nuestra buena intención, nuestro cariño mal entendido, separa a
              nuestro animal de un óptimo estado de salud y es el origen de
              innumerables problemas...
            </p>
            <p>
              Pues sí. Nuestra buena intención, nuestro intento de asimilar aún
              más a nuestro amigo a nosotros mismos, aunque sea por la vía
              digestiva, provoca problemas: desequilibrios dietéticos,
              alteraciones en los balances nutricionales... ¿qué es eso?...
              ¡¡muy sencillo!!: que si el perro debe comer "X" de proteína al
              día dándole una cantidad determinada de alimento comercial, y le
              añadimos un trozo de filete a su ración diaria, estará comiendo
              "X" de proteína del alimento comercial + "X" de proteína del
              filete. Y eso no es lo correcto... es evidente que el resultado de
              la operación es bien distinto en uno y otro caso... por más cariño
              que le pongamos... ¡¡ así no salen las cuentas!!
            </p>

            <h3>OBESIDAD</h3>
            <p>
              Como casi todas las malas costumbres de nuestro animal de
              compañía, el ser un individuo casi obsesionado por el alimento, no
              surge de forma espontánea, es el lógico y patológico desenlace
              tras una serie de incorrectas actuaciones de manejo del
              propietario.
            </p>
            <p>
              La fijación adquirida hacia el alimento tiene como consecuencia
              múltiples problemas: robos, perro basurero (el animal se mete en
              la boca todo lo que encuentra a su alcance), patologías digestivas
              por ingestión de productos en mal estado... y la inevitable
              obesidad como consecuencia de una mayor entrada de alimento de la
              necesaria para el desarrollo de una vida normal.
            </p>

            <h3>¿ESTÁ REALMENTE GORDO?</h3>
            <p>
              Podemos considerar obeso a todo aquel animal cuyo peso sobrepasa
              un 15% del ideal. En nuestra sociedad, entre un 30 y un 50% de
              perros y entre un 15 y un 30% de gatos, son obesos.
            </p>
            <p>
              Lo más curioso, es que la obesidad de nuestras mascotas es
              muchísimo más frecuente si los propietarios también presentan este
              exceso de peso; hasta cierto punto es lógico pues propietario y
              animal hacen menos ejercicio, el dueño come más de lo debido y
              "solidariza" a su mascota en sus excesos a base de comida
              cocinada, mayor cantidad de comida específica del animal, todo
              tipo de chucherías...
            </p>
            <p>
              La posibilidad de que nuestra mascota padezca obesidad aumenta con
              la edad, y se presenta más comúnmente en las hembras que en los
              machos. También existen razas más predispuestas: Labrador, Cairn
              Terrier, Cocker Spaniel, Teckel, Basset Hound...
            </p>
            <p>
              A todos nos cuesta reconocer que nuestro animal no está fuerte,
              sino gordo, y gracias a este no querer ver la realidad, nuestro
              animal seguirá su tendencia, su peligrosa tendencia de seguir
              comiendo sin freno, acumulando kilos en su organismo y haciendo un
              peligroso acopio de graves patologías.
            </p>

            <h3>Examinando la Obesidad</h3>
            <ul>
              <li>Consultar el peso ideal de su raza (si la tiene).</li>
              <li>
                Palpar sus costillas: deben notarse al pasar la mano con
                suavidad; si no las notamos... ¡malo!
              </li>
              <li>No debe presentar "carnes colgantes" en su abdomen.</li>
            </ul>

            <p>
              Si creemos que nuestro animal está gordo, acudamos al veterinario,
              con él plantearemos el plan a seguir para reducir el peso de
              nuestro mejor amigo, dicho plan constará de los siguientes puntos:
            </p>
            <ul>
              <li>Cooperación absoluta (imprescindible) del propietario.</li>
              <li>
                Evaluar la salud del paciente para confirmar o descartar
                posibles patologías que favorezcan la obesidad.
              </li>
              <li>Pesar al animal y evaluar su peso ideal.</li>
              <li>
                Establecer unos objetivos para la reducción del peso (cuantos
                kilos y en cuanto tiempo).
              </li>
              <li>
                Reducir el ingreso calórico:
                <ul>
                  <li>Disminuir la cantidad del alimento habitual.</li>
                  <li>Utilizar dietas de adelgazamiento.</li>
                </ul>
              </li>
              <li>
                Alimentar varias veces al día (la cantidad establecida por día
                se reparte en tres o cuatro tomas).
              </li>
              <li>
                Mantener al animal alejado de las zonas de comedor y cocina
                cuando se coma o cocine.
              </li>
              <li>
                Ejercicio adecuado a las características del animal (de menor a
                mayor intensidad).
              </li>
              <li>
                Reconocimiento y pesaje del animal cada dos semanas
                (aproximadamente).
              </li>
            </ul>

            <h3>Perro "Obeso"</h3>
            <p>
              Un perro comerá gran cantidad de alimento siempre y cuando
              disponga de esa posibilidad... por el momento no se conoce ningún
              ejemplar con la capacidad de ir a la compra y servirse la cantidad
              que le apetezca. Los excesos alimentarios y la consiguiente
              obesidad, vienen dados por los siguientes comportamientos del
              propietario:
            </p>
            <ul>
              <li>
                Alimentar a libre disposición a aquellos animales que comen con
                mucha rapidez o que no controlan su límite.
              </li>
              <li>
                Complementar la dosis diaria de alimento con sobras de nuestra
                comida o con añadidos alimentarios de dudosa eficacia y gran
                perjuicio.
              </li>
              <li>
                Utilización de alimentos inadecuados para la edad, estado o
                actividad de nuestra mascota.
              </li>
            </ul>
            <p>Las soluciones a estos frecuentes errores son sencillas:</p>
            <ul>
              <li>Controlar la cantidad de alimento diario.</li>
              <li>No complementar el alimento con comida casera, sobras...</li>
              <li>
                Utilizar un alimento adecuado para la edad, estado y actividad
                de nuestra mascota.
              </li>
            </ul>
          </Col>
          <Col className="imagenes_cuidados">
            <div className="imagen_perro">
              <img src="/images/perros_cuidados/perro1.jpg"></img>
            </div>
            <div className="imagen_perro">
              <img src="/images/perros_cuidados/perro2.jpg"></img>
            </div>
            <div className="imagen_perro">
              <img src="/images/perros_cuidados/perro3.jpg"></img>
            </div>
            <div className="imagen_perro">
              <img src="/images/perros_cuidados/perro4.jpg"></img>
            </div>
          </Col>
          <h2 onClick={() => SetShowEducacion(!showEducacion)}>Educación</h2>
          <Col
            className={`desplegable educacion ${
              showEducacion ? "show" : "hide"
            }`}
          >
            <p>
              Dicen que quien tiene un amigo tiene un tesoro, y no hay amigo más
              leal que un perro. Desde pequeños se nos puede inculcar el amor
              por este rey de las mascotas domésticas pero, ¿Son todos los
              perros adecuados para acompañar a los más pequeños de la casa?
            </p>

            <p>
              Para lograr una convivencia feliz entre nuestros hijos y las
              mascotas, hemos de educarles en el respeto por los perros y el
              resto de animales. Es lo que la Fundación Affinity recomienda en
              las publicaciones que dedica a niños y mayores. Para la Fundación,
              los perros más adecuados para criar con pequeños alrededor son:
            </p>

            <ul>
              <li>Carlino</li>
              <li>Teckel de pelo duro</li>
              <li>Cocker</li>
              <li>Labrador</li>
              <li>Golden Retriever</li>
              <li>Leonberg</li>
            </ul>

            <h3>Carlino</h3>
            <p>
              Los Carlinos son esos pequeños perros regordetes de aspecto
              afable, que según la Federación Cinológica Internacional (FCI),
              son alegres y vivaces, además de inteligentes. Poseen un gran
              encanto que les hace irresistibles a los ojos de los niños. El
              peso que alcanzan oscila entre los 6 y los 8 kg aproximadamente.
            </p>

            <h3>Teckel de Pelo Duro</h3>
            <p>
              La FCI destaca en su ficha del Teckel la buena relación que se da
              entre estos perros y los niños. Una de las razones bien puede ser
              el carácter curioso de estos animales, que son también empleados
              como perros de caza. El comúnmente conocido como "perro salchicha"
              puede convertirse en un buen aliado en los juegos más intrépidos
              de nuestros hijos y ayudarles a investigar y descubrir las
              bondades del entorno que les rodea. Su necesidad de espacio es
              reducida y su tamaño varía en función del tipo de Teckel ante el
              que nos encontremos, desde los 3, 5 kg del Teckel Kanichen, hasta
              los 9 del Estándar.
            </p>

            <h3>Cocker</h3>
            <p>
              El Cocker es quizá uno de los más conocidos y admirados por el
              gran público. Puede que sea por la excelente relación que según la
              FCI desarrolla con los reyes de la casa. En el caso del Cocker
              Spaniel, nos hallamos ante un revoltoso y travieso compañero de
              juegos. Con reputación de nervioso, el Cocker puede vivir en el
              interior de una vivienda si se cumplen las pautas regulares de
              paseo.
            </p>

            <h3>Labrador</h3>
            <p>
              Aquellos que cuentan con espacio suficiente para tener un perro de
              mayor tamaño, pueden permitirse el lujo de contar con un Labrador
              como miembro de la familia. La revista Animalia en su volumen
              publicado en julio de 2004, tras la Exposición Canina Europea
              celebrada en aquel año en Barcelona, destaca el carácter familiar
              del perro guía por excelencia. La FCI lo define como adaptable y
              dócil en el trato.
            </p>

            <h3>Golden Retriever</h3>
            <p>
              Del mismo modo se retrata el Golden Retriever que destaca por ser
              especialmente afectuoso. Eso sí, la FCI advierte que el
              mantenimiento de estos perros supone un considerable coste.
            </p>

            <h3>Leonberg</h3>
            <p>
              Para terminar hablaremos del Leonberg, que empatiza de un modo
              especial con los niños, con quienes asume las tareas de cuidado y
              protección. Este perro necesita mucho espacio y ejercicio de
              manera regular, ya que por su carácter perezoso necesita engrasar
              sus músculos con frecuencia.
            </p>

            <p>
              Estas son las razas que los expertos recomiendan a la hora de
              buscar un compañero de juegos para nuestros pequeños. La elección
              es complicada, ahora tú decides con cuál te quedas.
            </p>
          </Col>
          <h2 onClick={() => SetShowEnfermedades(!showEnfermedades)}>
            Salud Canina
          </h2>
          <Col
            className={`desplegable enfermedades_y_salud ${
              showEnfermedades ? "show" : "hide"
            }`}
          >
            <h3>Problema de Población de Mascotas</h3>
            <p>
              Cada año, millones de perros y gatos no deseados, incluyendo
              cachorros y gatitos, son sacrificados innecesariamente. La buena
              noticia es que cada dueño de una mascota puede hacer la
              diferencia. Al tener a su perro o gato esterilizado
              quirúrgicamente, usted estará poniendo de su parte para prevenir
              el nacimiento de cachorros y gatitos no deseados y mejorar la
              salud y la calidad de vida de su mascota.
            </p>

            <h3>Conducta y Reproducción de Mascotas</h3>
            <p>
              Contrario a lo que muchas personas creen, quedarse embarazadas,
              incluso una vez, no mejora la conducta de las perras y gatas. De
              hecho, el instinto de apareamiento puede llevar a conductas
              indeseables y resultar en un estrés excesivo tanto para el dueño
              como para el animal. Además, mientras que algunos dueños de
              mascotas pueden tener buenas intenciones, pocos están preparados
              para el trabajo que involucra el control del embarazo de su
              mascota, el cuidado de los cachorros o los gatitos y el buscar
              buenos hogares para ellos.
            </p>

            <h3>Esterilización Quirúrgica</h3>
            <p>
              Durante la esterilización quirúrgica, un veterinario retira
              ciertos órganos reproductivos. Si su perro o gato es hembra, el
              veterinario usualmente retirará sus ovarios, trompas de Falopio y
              útero. El nombre médico de esta cirugía es ovariohisterectomía,
              aunque es comúnmente llamada "esterilización." Si su mascota es un
              macho, se retiran los testículos y la operación es llamada
              orquiectomía, comúnmente conocida como castración o simplemente
              "castrado."
            </p>

            <h3>Beneficios de la Esterilización y la Castración</h3>
            <p>
              Ambas cirugías previenen camadas no deseadas y eliminan muchos
              problemas de conducta asociados con el instinto de apareamiento.
            </p>

            <h3>Beneficios de Esterilizar a una Mascota Hembra</h3>
            <p>
              La esterilización elimina los ciclos de celo y generalmente reduce
              las conductas indeseables que llevan a la frustración del dueño y,
              a final de cuentas, a tomar una decisión de llevar a la mascota a
              un refugio. Lo más importante es que la esterilización temprana de
              perras y gatas puede ayudar a protegerlas de algunos problemas de
              salud serios que puedan tener más adelante, como infecciones
              urinarias y cáncer de seno.
            </p>

            <h3>Beneficios de Castrar a una Mascota Macho</h3>
            <p>
              La castración en perros y gatos machos reduce el instinto de
              reproducción y puede tener un efecto calmante que los hace menos
              propensos a deambular y más conformes con permanecer en casa. La
              castración también reduce el riesgo de desarrollar enfermedades de
              la próstata y cáncer de testículo.
            </p>

            <h3>Riesgos Asociados con la Cirugía</h3>
            <p>
              Como en cualquier procedimiento quirúrgico, la esterilización está
              asociada con cierto riesgo anestésico y quirúrgico, pero la
              incidencia promedio de complicaciones es muy baja. Su veterinario
              le asesorará sobre los beneficios y los riesgos del procedimiento
              de esterilización.
            </p>

            <h3>Mejor Edad para Esterilizar o Castrar a su Mascota</h3>
            <p>
              Consulte con su veterinario sobre el momento más apropiado para
              esterilizar o castrar a su mascota, lo cual se basa en su raza,
              edad y condición física. Tenga en mente que, contrario a lo que se
              cree popularmente, NO es mejor esperar hasta que su perra o gata
              haya pasado su primer ciclo de celo.
            </p>

            <h3>Efectos en el Comportamiento y Metabolismo</h3>
            <p>
              El procedimiento no tiene efecto sobre la inteligencia o la
              capacidad de una mascota para aprender, jugar, trabajar o cazar.
              La mayoría de las mascotas tienden a mostrar una mejor conducta
              después de la cirugía, convirtiéndose en una compañía más
              deseable.
            </p>

            <h3>¿Vale la Pena el Gasto?</h3>
            <p>
              ¡Sí! Es un gasto único que puede mejorar drásticamente la calidad
              de vida de su mascota y puede prevenir algunas frustraciones
              relacionadas con su conducta. Esterilizar o castrar a su mascota
              es parte de la posesión responsable de una mascota.
            </p>

            <p>
              Esta información ha sido preparada como un servicio por parte de
              la American Veterinary Medical Association. Es aceptable su
              redistribución, pero el contenido y el formato originales del
              documento deben mantenerse como tales, y su fuente debe ser
              mencionada de manera destacada.
            </p>

            <h2>Grasa en los Perros</h2>

            <p>
              Para comenzar, no "antropomorficemos" al perro, esto quiere decir
              no lo "humanicemos", no creamos que porque a nosotros nos van mal
              las grasas a él también, o porque a nosotros nos gusta la cerveza
              a nuestro compañero también; nos acompaña en atardeceres pero no
              en bares ni discotecas.
            </p>

            <p>
              Por otra parte, el perro no padece de colesterol, como nosotros,
              salvo contadas excepciones, por problemas muy específicos. Pero ya
              les digo, el 99,9% de los perros tienen niveles de colesterol
              durante toda su vida que son la envidia de los humanos.
            </p>

            <h3>¿Por qué no tienen problemas de colesterol?</h3>
            <p>
              Quizá por su naturaleza carnívora, su dieta consistía en grandes
              cantidades de carne cuando cazaban y ésta iba acompañada de grasa.
            </p>

            <h3>Datos sobre las grasas en los perros:</h3>
            <ul>
              <li>
                Las grasas también son conocidas como aceites o lípidos, y más
                científicamente, como extracto etéreo.
              </li>
              <li>Confieren un gran sabor a los alimentos.</li>
              <li>
                Son necesarias para la absorción de vitaminas liposolubles: A,
                D, E y K.
              </li>
              <li>Son una fuente de ácidos grasos esenciales.</li>
              <li>
                Las grasas como tales en el perro, y en el humano, no son ningún
                problema, al contrario, son benéficas. El problema radica
                principalmente en su cantidad y en la falta de actividad del
                individuo, así como en la calidad de las mismas.
              </li>
              <li>
                La grasa es el componente que más energía proporciona. Un gramo
                de grasa produce aproximadamente 9 calorías, contra las 3.5 de
                la proteína o del carbohidrato.
              </li>
              <li>
                Mientras más digerible y metabolizable sea la grasa mejor. Es
                decir, que se absorba y sea utilizada. Los alimentos de calidad,
                en promedio, utilizan grasas con una digestibilidad del 90%.
              </li>
              <li>
                Los ácidos grasos omega 3 y 6 son un tipo de grasas con muchos
                beneficios para la salud del perro.
              </li>
              <li>
                Las dietas comerciales contienen del 7 al 25% de grasa,
                dependiendo del tipo de alimento.
              </li>
              <li>
                Las grasas no son ningún problema, el secreto está en su
                cantidad, calidad y uso por parte del que las consume, en este
                caso nuestro mejor amigo.
              </li>
              <li>
                Grasas saturadas: son casi siempre de origen animal y pueden
                solidificarse a temperatura ambiente. No son un problema para
                los perros, pero no debemos abusar de ellas.
              </li>
              <li>
                Grasas insaturadas: son las grasas vegetales y permanecen
                líquidas a temperatura ambiente.
              </li>
              <li>
                Deficiencias de grasas se manifiestan principalmente en
                problemas de piel y pelo poco brillante.
              </li>
              <li>
                Exceso de grasas puede conducir al sobrepeso, pero no afecta el
                colesterol en los perros.
              </li>
            </ul>
          </Col>
          <h2 onClick={() => SetShowHigiene(!showHigiene)}>
            Higiene para Perros
          </h2>
          <Col
            className={`desplegable higiene ${showHigiene ? "show" : "hide"}`}
          >
            <p>
              Cortar las uñas al perro no supone un acto de especialización o de
              alta cualificación, pero es importante ser instruidos por un
              profesional antes de hacerlo. La uña del perro contiene vasos
              sanguíneos y nervios, y cortarlas incorrectamente puede causar
              dolor y sangrado.
            </p>
            <p>
              Un perro activo que sale regularmente a la calle generalmente solo
              requiere cortar las uñas "interiores" de las patas delanteras. En
              el caso de uñas que no tocan el suelo, como los espolones, también
              es necesario controlarlas y cortarlas.
            </p>

            <h3>El Cachorro</h3>
            <p>
              Es importante acostumbrar al cachorro desde pequeño a prácticas de
              higiene para toda su vida.
            </p>

            <h3>El Cepillado</h3>
            <p>
              Los perros no deben bañarse con demasiada frecuencia. El cepillado
              frecuente es mejor para mantenerlos limpios y eliminar el pelo
              muerto. Es importante enseñar al cachorro que el cepillado es una
              experiencia agradable desde pequeño.
            </p>
            <ul>
              <li>Usa un cepillo adecuado para el tipo de pelo del perro.</li>
              <li>
                Cepilla por capas desde la piel hacia afuera para evitar nudos.
              </li>
              <li>Realiza el cepillado en un lugar cómodo y con buena luz.</li>
              <li>
                Revisa la piel y el pelo del cachorro en busca de heridas o
                problemas mientras lo cepillas.
              </li>
            </ul>

            <h3>El Baño</h3>
            <p>
              Los cachorros solo deben bañarse si están muy sucios. Utiliza un
              champú suave para cachorros y enjuágalo bien. Sécalo con una
              toalla y un secador de pelo con aire frío o templado,
              manteniéndolo a una distancia segura para no quemar la piel.
            </p>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};
