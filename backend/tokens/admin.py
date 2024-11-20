from django.contrib import admin
from django.contrib.auth.models import User
from tokens.models import TokenBalance, TokenTransaction, Address


class TokenBalanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'balance')
    search_fields = ('user__username',)


class TokenTransactionAdmin(admin.ModelAdmin):
    list_display = ('sender', 'recipient', 'amount', 'timestamp')
    list_filter = ('timestamp', 'sender', 'recipient')
    search_fields = ('sender__username', 'recipient__username', 'amount')
    readonly_fields = ('timestamp',)


class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'address')
    search_fields = ('user__username', 'address')


admin.site.register(Address, AddressAdmin)
admin.site.register(TokenBalance, TokenBalanceAdmin)
admin.site.register(TokenTransaction, TokenTransactionAdmin)
