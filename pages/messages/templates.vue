<template>
    <div>
        <template v-if="progress">
            <v-card-text class="progress_loader">
                <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
            </v-card-text>
        </template>
        <template v-else>
            <v-layout wrap class="elevation-3">
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-btn icon @click="routerBack">
                            <v-icon>arrow_back</v-icon>
                        </v-btn>
                        <v-toolbar-title>Шаблоны писем</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-flex>
                <v-flex sm6 md6 xs12>
                    <v-toolbar class="no-shadow">
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="dialogNew = true">Новое письмо</v-btn>
                        <v-btn icon>
                            <v-icon>help_outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-flex>
            </v-layout>



            <v-card v-for="mail in messages" :key="mail.id" class="mt-3">
                <v-card-title>
                    <h3 class="headline mb-0">{{mail.title}} | {{mail.lang}}</h3>
                </v-card-title>
                <v-card-text>
                    <div class="mail_content">
                        {{mail.info}}
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn small color="success" @click="dialogEditMail(mail)">Редактировать</v-btn>
                    <v-btn flat small color="error" @click="dialogDeleteMail(mail)">Удалить</v-btn>
                </v-card-actions>
            </v-card>


        </template>

        <v-dialog v-model="dialogNew" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Новое письмо</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Заголовок письма" v-model="newMail.title"></v-text-field>
                    <v-textarea
                            v-model="newMail.info"
                            auto-grow
                            label="Содержимое письма"
                            rows="1"
                    ></v-textarea>
                    <v-select
                            :items="languages"
                            v-model="newMail.lang"
                            label="Язык письма"
                    ></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="saveNewMail">Сохранить</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogNew = false">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Редактирование письма</span>
                </v-card-title>
                <v-card-text>

                    <v-text-field label="Заголовок письма" v-model="editMail.title"></v-text-field>

                    <v-textarea
                            v-model="editMail.info"
                            auto-grow
                            label="Содержимое письма"
                            rows="1"
                    ></v-textarea>
                    <v-select
                            :items="languages"
                            v-model="editMail.lang"
                            label="Язык письма"
                    ></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="saveEditMail">Обновить</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogEdit = false">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Вы действительно хотите удалить это письмо?</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Заголовок письма" v-model="deleteMail.title"></v-text-field>
                    <v-textarea
                            v-model="deleteMail.info"
                            auto-grow
                            label="Содержимое письма"
                            rows="1"
                    ></v-textarea>
                    <v-text-field label="Язык письма" v-model="deleteMail.lang"></v-text-field>

                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="saveDeleteMail">Удалить</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogDelete = false">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>


</template>


<script>
    export default {
        name: 'messages-templates',
        head() {
            return {
                title: 'Шаблоны писем'
            }
        },
        data() {
            return {
                languages:[
                    'ru',
                    'ua'
                ],
                progress: false,
                editMail: {
                    title: null,
                    info: null,
                    lang:null,
                },
                deleteMail: {
                    title: null,
                    info: null,
                    lang:null,
                },
                newMail: {
                    title: null,
                    info: null,
                    lang:null,
                },
                dialogEdit: false,
                dialogDelete: false,
                dialogNew: false,
            }
        },
        created() {

            this.getMails();
        },
        methods: {
            getMails() {
                this.progress = true;
                this.axios.get('messages').then((response) => {
                    this.messages = response.data.messages;
                    this.progress = false;
                })
            },
            saveNewMail() {
                this.axios.post('messages', this.newMail).then((response) => {
                    console.log(response.data);
                    this.dialogNew = false;
                    this.getMails();
                }).catch((error) => {
                    console.log('Ошибка');
                    console.log(error.response);
                });
            },
            saveDeleteMail() {
                this.axios.delete('messages/' + this.deleteMail.id,).then((response) => {
                    console.log(response.data);
                    this.dialogDelete = false;
                    this.getMails();

                }).catch((error) => {
                    console.log('Ошибка');
                    console.log(error.response);
                });
            },
            saveEditMail() {
                this.axios.patch('messages/' + this.editMail.id, this.editMail).then((response) => {
                    console.log(response.data);
                    this.dialogEdit = false;
                    this.getMails();

                }).catch((error) => {
                    console.log('Ошибка');
                    console.log(error.response);
                });
            },
            dialogEditMail(mail) {
                this.editMail = mail;
                this.dialogEdit = true;
            },
            dialogDeleteMail(mail) {
                this.deleteMail = mail;
                this.dialogDelete = true;
            },
            routerBack() {
                this.$router.go(-1);
            }
        }
    }

</script>
