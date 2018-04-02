package com.ciandt.includeday7.backend.endpoint;

import com.ciandt.includeday7.backend.model.ComputerVisionInput;
import com.ciandt.includeday7.backend.model.ComputerVisionOut;
import com.ciandt.includeday7.backend.service.ComputerVisionService;
import com.google.api.server.spi.config.*;
import com.google.api.server.spi.response.ConflictException;

@Api(
        name = "computervisionazure",
        version = "v1",
        namespace =
        @ApiNamespace(
                ownerDomain = "backend.includeday7.ciandt.com",
                ownerName = "backend.includeday7.ciandt.com",
                packagePath = ""
        )
)
public class ComputerVisionAzure {
    private ComputerVisionService computerVisionService;

    public ComputerVisionAzure() {
        computerVisionService = new ComputerVisionService();
    }

    @ApiMethod(
            name = "analyzeImage",
            path = "analyzeimage",
            httpMethod = ApiMethod.HttpMethod.POST,
            apiKeyRequired = AnnotationBoolean.TRUE)
    public ComputerVisionOut analyzeImage(ComputerVisionInput computerVisionInput) throws ConflictException {
        return computerVisionService.analyze(computerVisionInput);
    }
}
