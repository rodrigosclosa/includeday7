#!/usr/bin/env bash

# Copyright 2017 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Fail on non-zero return and print command to stdout
set -xe

gcloud config set project includeday-7

# Jenkins provides values for GOOGLE_PROJECT_ID and GOOGLE_VERSION_ID
# Update Greetings.java
#UNIQUE_MAVEN_STRING="maven"
#sed -i'.bak' -e "s/YOUR_PROJECT_ID/${GOOGLE_PROJECT_ID}/g" pom.xml

mvn clean endpoints-framework:openApiDocs

gcloud endpoints services deploy target/openapi-docs/openapi.json

# Test with Maven
mvn appengine:deploy \
    -Dapp.deploy.version="1" \
    -Dapp.deploy.promote=true

# Clean
mvn clean
