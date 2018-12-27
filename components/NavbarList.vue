<template>
  <v-list dense>
    <v-list-tile>
      <nuxt-link to="/" class="navigation-link">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Главная
          </v-list-tile-title>
        </v-list-tile-content>
      </nuxt-link>
    </v-list-tile>
    <v-divider/>
    <v-list-group v-model="menu_models.notifications"
                  :prepend-icon="menu_models.notifications ? 'keyboard_arrow_up' : 'notifications'">
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>
            Заявки
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <nuxt-link :to="{name: 'requests'}" class="navigation-link">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Новые заявки
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link :to="{name: 'reservations'}" class="navigation-link">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Все брони
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>
    </v-list-group>


    <v-list-tile>
      <nuxt-link :to="{name: 'prices'}" class="navigation-link">
        <v-list-tile-action>
          <v-icon>attach_money</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Цены на номера
          </v-list-tile-title>
        </v-list-tile-content>
      </nuxt-link>
    </v-list-tile>

    <v-list-tile>
      <nuxt-link :to="{name: 'queue'}" class="navigation-link">
        <v-list-tile-action>
          <v-icon>list</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Очередь
          </v-list-tile-title>
        </v-list-tile-content>
      </nuxt-link>
    </v-list-tile>

    <v-list-group v-model="menu_models.calendar_view_day"
                  :prepend-icon="menu_models.calendar_view_day ? 'keyboard_arrow_up' : 'calendar_view_day'">
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>
            Отчеты
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <nuxt-link
          :to="{ name: 'transfer-begin_date-end_date', params: {begin_date: begin_date, end_date: end_date}}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>directions_car</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Трансфер
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link
          :to="{ name: 'parking-begin_date-end_date', params: {begin_date: begin_date, end_date: end_date}}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>local_parking</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Паркоместа
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link
          :to="{ name: 'prepaid-begin_date-end_date', params: {begin_date: begin_date, end_date: end_date}}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>donut_large</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Статистика предоплат
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link
          :to="{ name: 'payment-begin_date-end_date', params: {begin_date: begin_date, end_date: end_date}}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>donut_small</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Статистика оплат
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link
          :to="{ name: 'clients-page', params: { page: 1}}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>supervised_user_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Клиенты
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

    </v-list-group>

    <v-list-tile>
      <nuxt-link
        :to="{ name: 'messages'}"
        class="navigation-link">
        <v-list-tile-action>
          <v-icon>mail_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Рассылка писем
          </v-list-tile-title>
        </v-list-tile-content>
      </nuxt-link>
    </v-list-tile>


    <v-list-group v-model="menu_models.settings_applications"
                  :prepend-icon="menu_models.settings_applications ? 'keyboard_arrow_up' : 'settings_applications'">
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>
            Параметры приложения
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link
          :to="{ name: 'users'}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Пользователи
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link
          :to="{ name: 'payment_types'}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>local_grocery_store</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Тип оплаты
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link
          :to="{ name: 'room_types'}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Тип номеров
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link
          :to="{ name: 'room_statuses'}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>done_all</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Статус номеров
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link
          :to="{ name: 'rooms'}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>local_hotel</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Все номера
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

      <v-list-tile>
        <nuxt-link
          :to="{ name: 'backup'}"
          class="navigation-link">
          <v-list-tile-action>
            <v-icon>backup</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Восстановление данных
            </v-list-tile-title>
          </v-list-tile-content>
        </nuxt-link>
      </v-list-tile>

    </v-list-group>

    <v-list-tile>
      <nuxt-link
        :to="{ name: 'settings'}"
        class="navigation-link">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Настройки
          </v-list-tile-title>
        </v-list-tile-content>
      </nuxt-link>
    </v-list-tile>
    <v-divider></v-divider>
    <v-list-tile>
      <nuxt-link
        :to="{ name: 'logout'}"
        class="navigation-link">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Выйти
          </v-list-tile-title>
        </v-list-tile-content>
      </nuxt-link>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    data() {
      return {
        begin_date: new Date().getFullYear() + '-01-01',
        end_date: new Date().toISOString().substr(0, 10),
        menu_models: {
          notifications: false,
          calendar_view_day: false,
          settings_applications: false,
        },
      }
    }
  }
</script>
