import { Fragment } from 'react'
import { CheckCircleIcon, XCircleIcon,  } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Transition } from '@headlessui/react'
import { useAppStore } from '../stores/useAppStore'

export default function Notification() {

    const {notification, hideNotification} = useAppStore()

    if (!notification.show) return null; 
    //añado para poder testear y asi comprobar si se abre o no dependiendo del valor de show
    // Esto evita renderizar todo
  
  return (
    <div
    data-testid="notification" //añado para poder testear
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={notification.show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
            {
                notification.error ? (
                    <XCircleIcon
                    aria-label="ícono de error" //añado para poder testear
                      role="img" 
                        className='h-6 w-6 text-red-400'
                        aria-hidden="true" //para hacerlo accesible
                    />
                )
                : 
                (
                    <CheckCircleIcon
                    aria-label="ícono de éxito" //añado para poder testear
                        className='h-6 w-6 text-green-400'
                         aria-hidden="true"
                    />
                )
            }
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">Notificación</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {notification.text}
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={hideNotification}
                  >
                    <span className="sr-only">Cerrar</span>

                  {/* sr-only hace que el texto "Cerrar" no sea visible, pero lo deja accesible para tecnologías de asistencia (lectores de pantalla). */}
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    {/* aria-hidden="true" es una propiedad de accesibilidad (del estándar WAI-ARIA) que le dice a tecnologías de asistencia (como lectores de pantalla) que ignoren ese elemento completamente. */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}