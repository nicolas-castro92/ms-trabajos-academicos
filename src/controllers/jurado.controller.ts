import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Configuracion} from '../keys/configuracion';
import {Jurado} from '../models';
import {CambioClave} from '../models/cambio-clave.model';
import {CredencialesRecuperarClave} from '../models/credenciales-recuperar-clave.model';
import {Credenciales} from '../models/credenciales.model';
import {NotificacionCorreo} from '../models/notificacion-correo.model';
import {TokenSession} from '../models/token-session.model';
import {JuradoRepository} from '../repositories';
import {AdminDeClavesService, NotificacionesService, UsuariosServiceService} from '../services';

export class JuradoController {
  constructor(
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
    @service(UsuariosServiceService)
    public userService: UsuariosServiceService,
    @service(AdminDeClavesService)
    public adminDeClavesService: AdminDeClavesService,
    @service(NotificacionesService)
    public notiService: NotificacionesService
  ) { }

  @post('/identificar-usuario')
  @response(200, {
    description: 'Identificacion de jurados',
    content: {'application/json': {schema: getModelSchemaRef(Credenciales)}},
  })
  async identificarJurado(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {
            title: 'Identificar jurado'
          }),
        },
      },
    })
    credenciales: Credenciales,
  ): Promise<object | null | void> {
    let usuario = await this.userService.validarCredenciales(credenciales)
    let tk = "";
    if (usuario) {
      //generar token y agregarlo a la respuesta


      //usuario.contrasenia = "";
      tk = await this.userService.crearToken(usuario);
      //console.log('aqui viene un token', tk);

      return {
        ok: true,
        tk, usuario
      }
      {
        throw new HttpErrors[400]('password invalido');
      }
      //return {usuarioxrol};
    }
  }


  @post('/cambiar-clave')
  @response(200, {
    description: 'cambio de clave usuarios',
    content: {'application/json': {schema: getModelSchemaRef(CambioClave)}},
  })
  async cambiarClave(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioClave, {
            title: 'Cambio de clave del usuario'
          }),
        },
      },
    })
    credencialesClave: CambioClave,
  ): Promise<boolean | null> {
    let usuario = await this.adminDeClavesService.cambiarClave(credencialesClave);
    if (usuario) {
      //invocar al servicio de notificaciones para enviar correo al user
      let datos = new NotificacionCorreo();
      datos.destino = usuario.correo;
      datos.asunto = Configuracion.asuntoClave;
      datos.mensaje = `${Configuracion.saludo} ${usuario.nombre} <br> ${Configuracion.mensajeCambioClave}`
      this.notiService.enviarCorreo(datos);
    }
    return usuario != null;
  }


  @post('/recuperar-clave')
  @response(200, {
    description: 'cambio de clave usuarios',
    content: {'application/json': {schema: {}}},
  })
  async recuperarClave(
    @requestBody({
      content: {
        'application/json': {
          schema: {},
        },
      },
    })
    credenciales: CredencialesRecuperarClave,
  ): Promise<object | null | boolean> {
    let usuario = await this.adminDeClavesService.recuperarClave(credenciales);
    if (usuario) {
      //invocar al servicio de notificaciones para enviar sms al user con la nueva clave
      return {
        ok: true
      }
    } else {
      throw new HttpErrors[400](`el usuario ${credenciales.correo} no existe, verifique nuevamente`);
    }
  }


  @post('/validacion')
  @response(200, {
    description: 'Validacion de token',
    content: {'application/json': {schema: getModelSchemaRef(TokenSession)}},
  })
  async validarToken(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokenSession, {
            title: 'validar usuario'
          }),
        },
      },
    })
    token: TokenSession,
  ): Promise<object | null | void> {
    console.log('aqui llega', token);
    if (token == null) {
      throw new HttpErrors[401](`unauthorized`);
    }
    let hayToken = await this.userService.validarToken(token)
    if (hayToken) {
      return hayToken;
    } else {
      throw new HttpErrors[400](`token invalido`);
    }
  }






  @post('/jurados')
  @response(200, {
    description: 'Jurado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jurado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {
            title: 'NewJurado',
            exclude: ['id'],
          }),
        },
      },
    })
    jurado: Omit<Jurado, 'id'>,
  ): Promise<Jurado> {
    return this.juradoRepository.create(jurado);
  }

  @get('/jurados/count')
  @response(200, {
    description: 'Jurado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Jurado) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.juradoRepository.count(where);
  }

  @get('/jurados')
  @response(200, {
    description: 'Array of Jurado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jurado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jurado) filter?: Filter<Jurado>,
  ): Promise<Jurado[]> {
    return this.juradoRepository.find(filter);
  }

  @patch('/jurados')
  @response(200, {
    description: 'Jurado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {partial: true}),
        },
      },
    })
    jurado: Jurado,
    @param.where(Jurado) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.juradoRepository.updateAll(jurado, where);
  }

  @get('/jurados/{id}')
  @response(200, {
    description: 'Jurado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jurado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Jurado, {exclude: 'where'}) filter?: FilterExcludingWhere<Jurado>
  ): Promise<Jurado> {
    return this.juradoRepository.findById(id, filter);
  }

  @patch('/jurados/{id}')
  @response(204, {
    description: 'Jurado PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {partial: true}),
        },
      },
    })
    jurado: Jurado,
  ): Promise<void> {
    await this.juradoRepository.updateById(id, jurado);
  }

  @put('/jurados/{id}')
  @response(204, {
    description: 'Jurado PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() jurado: Jurado,
  ): Promise<void> {
    await this.juradoRepository.replaceById(id, jurado);
  }

  @del('/jurados/{id}')
  @response(204, {
    description: 'Jurado DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradoRepository.deleteById(id);
  }
}
