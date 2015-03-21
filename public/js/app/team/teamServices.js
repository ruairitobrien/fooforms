angular.module('team')
    .factory('TeamService',
    ['$log', 'Restangular', 'Session', '_',
        function ($log, Restangular, Session, _) {
            'use strict';
            var teamApi = Restangular.all('teams');

            return {

                createTeam: function (team, next) {
                    if (!team.members) {
                        team.members = [];
                    }
                    team.members.push(Session.user._id);
                    teamApi.post(team).then(function (teamResponse) {
                        Session.user.teams.push(teamResponse);
                        Session.user.put().then(function (res) {
                            return next(null, teamResponse);
                        }, function (err) {
                            $log.error(err);
                            return next(err);
                        });
                    }, function (err) {
                        $log.error(err);
                        return next(err);
                    });
                },
                updateTeam: function (team, next) {
                    if(typeof team.put !== 'function') {
                        team = Restangular.restangularizeElement(teamApi, team, '');
                    }
                    var memberIds = [];

                    for(var i = 0; i < team.members.length; i++) {
                        var member = team.members[i];
                        if(member) {
                            if(member._id) {
                                member = member._id;
                            }
                            memberIds.push(member);
                        }

                    }

                    team.members = memberIds;

                    team.put().then(function (res) {
                        return next(null, res);
                    }, function (err) {
                        $log.error(err);
                        return next(err);
                    });
                },
                deleteTeam: function (team, next) {
                    if(typeof team.remove !== 'function') {
                        team = Restangular.restangularizeElement(teamApi, team, '');
                    }
                    team.remove().then(function () {
                        return next(null);
                    }, function (err) {
                        $log.error(err);
                        return next(err);
                    });
                },
                getMembers: function (team, next) {
                    if(typeof team.getList !== 'function') {
                        team = Restangular.restangularizeElement(teamApi, team, '');
                    }
                    team.getList('members').then(function (members) {
                        return next(null, members);
                    }, function (err) {
                        $log.error(err);
                        return next(err);
                    });
                },
                addMember: function (args, next) {
                    if (typeof args.team.patch !== 'function') {
                        args.team = Restangular.restangularizeElement(teamApi, args.team, '');
                    }
                    args.team.patch({
                        action: 'addMember',
                        user: args.userId
                    }).then(function (team) {
                        return next(null, team);
                    }, function (err) {
                        return next(err);
                    });
                },
                removeMember: function (args, next) {
                    if (typeof args.team.patch !== 'function') {
                        args.team = Restangular.restangularizeElement(teamApi, args.team, '');
                    }
                    args.team.patch({
                        action: 'removeMember',
                        user: args.userId
                    }).then(function (team) {
                        return next(null, team);
                    }, function (err) {
                        return next(err);
                    });
                }
            }


        }])
    .service('Team', function () {
        'use strict';
        this.activeTeam = {};
        this.newTeam = function () {
            this.activeTeam = {displayName: 'New Team', description: ''};
            if (this.activeTeam._id) {
                delete this.activeTeam._id;
            }
            return this.activeTeam;
        };

        this.setTeam = function (team) {
            this.activeTeam = team;
            return this.activeTeam;
        };

        return this;
    });